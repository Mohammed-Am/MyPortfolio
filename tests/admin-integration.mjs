// Local-only fake Supabase contract. No production credentials or external writes.
// Run after npm run build. --serve keeps the fixture app open for browser QA.
import http from 'node:http'
import { spawn } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import assert from 'node:assert/strict'

const port = Number(process.env.TEST_APP_PORT || 3100)
const dbPort = Number(process.env.TEST_DB_PORT || 4100)
const origin = `http://localhost:${port}`
let stored = null
let messages = []
let rateAllowed = true
let dbAvailable = true
let rateFailure = ''
const revoked = new Set()
const server = http.createServer(async (req, res) => {
  const chunks = []; for await (const chunk of req) chunks.push(chunk)
  const raw = Buffer.concat(chunks)
  const isUpload = req.url.startsWith('/storage/v1/object/')
  const body = !isUpload && raw.length ? JSON.parse(raw.toString()) : {}
  const url = new URL(req.url, `http://localhost:${dbPort}`)
  const send = (data, status = 200) => { res.writeHead(status, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(data)) }
  if (!dbAvailable) return send({}, 503)
  if (isUpload) return send({ Key: req.url }, 200)
  if (url.pathname === '/auth/v1/token') return body.password === 'fixture-password' ? send({ access_token: body.email === 'owner@example.test' ? 'owner-token' : 'other-token', expires_in: 3600, user: { id: body.email === 'owner@example.test' ? 'owner-id' : 'other-id' } }) : send({}, 400)
  if (url.pathname === '/auth/v1/user') return req.headers.authorization === 'Bearer owner-token' && !revoked.has('owner-token') ? send({ id: 'owner-id' }) : send({}, 401)
  if (url.pathname === '/auth/v1/logout') { revoked.add('owner-token'); return send({}) }
  if (url.pathname === '/rest/v1/rpc/portfolio_rate_limit') {
    if (rateFailure === 'network') return res.destroy()
    if (rateFailure === 'html') { res.writeHead(200, { 'Content-Type': 'text/html' }); return res.end('<html>Wrong project URL</html>') }
    if (rateFailure) return send({}, Number(rateFailure))
    return send(rateAllowed)
  }
  if (url.pathname === '/rest/v1/portfolio_content') return send(stored ? [stored] : [])
  if (url.pathname === '/rest/v1/rpc/save_portfolio_content') {
    if (body.expected_revision !== (stored?.revision || 0)) return send(-1)
    stored = { content: body.new_content, revision: body.expected_revision + 1 }; return send(stored.revision)
  }
  if (url.pathname === '/rest/v1/portfolio_messages') {
    if (req.method === 'POST') { messages.unshift({ ...body, id: randomUUID(), status: 'unread', created_at: new Date().toISOString() }); return send({}, 201) }
    if (req.method === 'PATCH') { const item = messages.find(item => `eq.${item.id}` === url.searchParams.get('id')); if (item) item.status = body.status; return send(item ? [item] : []) }
    const offset = Number(url.searchParams.get('offset') || 0); return send(messages.slice(offset, offset + 50))
  }
  return send({ error: 'unknown fixture route' }, 404)
})
await new Promise(resolve => server.listen(dbPort, '127.0.0.1', resolve))
const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', String(port)], {
  cwd: process.cwd(), env: { ...process.env, APP_URL: ` "${origin}" `, SUPABASE_URL: ` "http://127.0.0.1:${dbPort}/" `, SUPABASE_ANON_KEY: ' fixture-anon ', SUPABASE_SERVICE_ROLE_KEY: ' fixture-server ', ADMIN_USER_ID: ' owner-id ' }, stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true,
})
child.stdout.on('data', () => {})
child.stderr.on('data', () => {})
const cleanup = () => { child.kill(); server.close() }
process.on('SIGINT', () => { cleanup(); process.exit() })
process.on('SIGTERM', () => { cleanup(); process.exit() })
let cookie = ''
const request = (path, method = 'GET', body, useCookie = true, requestOrigin = origin) => fetch(`${origin}${path}`, { method, headers: { ...(method !== 'GET' ? { Origin: requestOrigin, 'Content-Type': 'application/json' } : {}), ...(useCookie && cookie ? { Cookie: cookie } : {}) }, ...(body === undefined ? {} : { body: JSON.stringify(body) }) })
try {
  let ready = false
  for (let i = 0; i < 60; i++) { try { if ((await fetch(origin)).ok) { ready = true; break } } catch {} await new Promise(resolve => setTimeout(resolve, 500)) }
  assert.ok(ready, 'Next server started')
  assert.equal((await request('/api/admin/content')).status, 401)
  assert.equal((await request('/api/admin/messages')).status, 401)
  assert.equal((await request('/api/admin/content', 'PUT', {})).status, 401)
  assert.equal((await request('/api/admin/messages', 'PATCH', {})).status, 401)
  assert.equal((await request('/api/admin/media', 'POST', {})).status, 401)
  assert.equal((await request('/api/admin/login', 'POST', {}, false, 'https://evil.example')).status, 403)
  assert.equal((await request('/api/admin/login', 'POST', { email: 'other@example.test', password: 'fixture-password' })).status, 401)
  assert.equal((await request('/api/admin/login', 'POST', { email: 'owner@example.test', password: 'wrong' })).status, 401)
  for (const [mode, expected] of [['401', 'server key'], ['404', 'database setup is missing'], ['html', 'unexpected response'], ['network', 'could not connect']]) {
    rateFailure = mode
    const response = await request('/api/admin/login', 'POST', { email: 'owner@example.test', password: 'fixture-password' })
    assert.equal(response.status, 503)
    assert.ok((await response.json()).error.includes(expected), `Actionable error for ${mode}`)
  }
  rateFailure = ''
  const login = await request('/api/admin/login', 'POST', { email: 'owner@example.test', password: 'fixture-password' })
  assert.equal(login.status, 200)
  const setCookie = login.headers.get('set-cookie')
  assert.match(setCookie, /HttpOnly/i); assert.match(setCookie, /SameSite=strict/i); assert.match(setCookie, /Secure/i)
  cookie = setCookie.split(';')[0]
  const upload = (bytes, extraHeaders = {}) => fetch(`${origin}/api/admin/media`, { method: 'POST', headers: { Cookie: cookie, Origin: origin, 'Content-Type': 'application/octet-stream', ...extraHeaders }, body: bytes })
  assert.equal((await upload(Buffer.from('<svg onload="alert(1)">unsafe</svg>'))).status, 415)
  assert.equal((await upload(Buffer.from('not an image but named jpg'))).status, 415)
  assert.equal((await upload(Buffer.alloc(25 * 1024 * 1024 + 1))).status, 413)
  const gif = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64')
  const gifResponse = await upload(gif)
  assert.equal(gifResponse.status, 200); assert.equal((await gifResponse.json()).type, 'image/gif')
  assert.equal((await upload(gif, { Origin: 'https://evil.example' })).status, 403)
  const mp4 = Buffer.concat([Buffer.from([0,0,0,24]), Buffer.from('ftypmp42'), Buffer.alloc(20)])
  const mp4Response = await upload(mp4)
  assert.equal(mp4Response.status, 200); assert.equal((await mp4Response.json()).type, 'video/mp4')
  const initial = await (await request('/api/admin/content')).json()
  assert.equal(initial.revision, 0)
  const draft = structuredClone(initial.content)
  draft.hero.title = 'Integration website builder'
  draft.seo.title = 'Integration Portfolio Title'
  draft.projects.items.push({ id: 'fixture-draft', title: 'PRIVATE-DRAFT-DO-NOT-LEAK', description: 'Private draft content', image: '', url: '', technologies: '', published: false })
  const saved = await request('/api/admin/content', 'PUT', { content: draft, revision: 0 })
  assert.equal(saved.status, 200)
  let html = await (await request('/')).text()
  assert.match(html, /Integration website builder/); assert.match(html, /Integration Portfolio Title/)
  assert.ok(!html.includes('PRIVATE-DRAFT-DO-NOT-LEAK'), 'Drafts do not leak into HTML or serialized client data')
  assert.equal((await request('/api/admin/content', 'PUT', { content: draft, revision: 0 })).status, 409)
  const unsafe = structuredClone(draft); unsafe.profile.github = 'javascript:alert(1)'
  assert.equal((await request('/api/admin/content', 'PUT', { content: unsafe, revision: 1 })).status, 400)
  const missing = structuredClone(draft); delete missing.hero.title
  assert.equal((await request('/api/admin/content', 'PUT', { content: missing, revision: 1 })).status, 400)
  assert.equal((await request('/api/admin/content', 'PUT', { content: draft, revision: 1 }, true, 'https://evil.example')).status, 403)
  draft.projects.items[0].published = true
  draft.projects.items[0].title = 'Published fixture website'
  draft.projects.items[0].video = 'https://example.com/walkthrough.mp4'
  draft.projects.items[0].gallery = ['https://example.com/demo.gif', 'https://example.com/screen.png']
  draft.sections.toolkit = false
  assert.equal((await request('/api/admin/content', 'PUT', { content: draft, revision: 1 })).status, 200)
  html = await (await request('/')).text()
  assert.match(html, /Published fixture website/)
  assert.equal((await request('/api/contact', 'POST', { name: 'Test', email: 'bad', message: 'short' }, false)).status, 400)
  const inquiry = { name: 'Test visitor', email: 'visitor@example.test', message: 'Please help me build a business website.', website: '' }
  assert.equal((await request('/api/contact', 'POST', { ...inquiry, website: 'spam' }, false)).status, 200)
  assert.equal(messages.length, 0)
  assert.equal((await request('/api/contact', 'POST', inquiry, false)).status, 200)
  assert.equal(messages.length, 1)
  assert.equal((await request('/api/contact', 'POST', inquiry, false, 'https://evil.example')).status, 403)
  const inbox = await (await request('/api/admin/messages')).json()
  assert.equal(inbox.messages[0].email, inquiry.email)
  assert.equal((await request('/api/admin/messages', 'PATCH', { id: messages[0].id, status: 'read' })).status, 200)
  assert.equal(messages[0].status, 'read')
  assert.equal((await request('/api/admin/messages', 'PATCH', { id: messages[0].id, status: 'archived' })).status, 200)
  assert.equal(messages[0].status, 'archived')
  rateAllowed = false
  assert.equal((await request('/api/contact', 'POST', inquiry, false)).status, 429)
  assert.equal((await request('/api/admin/login', 'POST', { email: 'owner@example.test', password: 'fixture-password' })).status, 429)
  rateAllowed = true
  dbAvailable = false
  assert.equal((await request('/api/contact', 'POST', inquiry, false)).status, 503)
  assert.equal((await request('/')).status, 200)
  dbAvailable = true
  assert.equal((await request('/api/admin/logout', 'POST')).status, 200)
  assert.equal((await request('/api/admin/messages')).status, 401)
  console.log('PASS: authentication, authorization, CSRF, media uploads/type checks/size limits, validation, draft privacy, publishing, conflicts, contact inbox, status changes, rate limiting, outage fallback, and logout.')
  if (process.argv.includes('--serve')) {
    revoked.clear(); stored = null; messages = []
    console.log(`Fixture preview: ${origin}/admin (owner@example.test / fixture-password). No production data.`)
  } else cleanup()
} catch (error) { console.error(error); cleanup(); process.exitCode = 1 }

import 'server-only'
import { cookies } from 'next/headers'
import { createHash } from 'crypto'
import { cache } from 'react'
import { defaultPortfolio, validatePortfolio, type Portfolio } from './portfolio'

export const SESSION_COOKIE = 'portfolio_admin'
// Hosting dashboards sometimes preserve pasted whitespace or surrounding quotes.
export function env(name: string) { return (process.env[name] || '').trim().replace(/^(['"])([\s\S]*)\1$/, '$2').trim() }
export const configured = () => Boolean(env('SUPABASE_URL') && env('SUPABASE_ANON_KEY') && env('SUPABASE_SERVICE_ROLE_KEY') && env('ADMIN_USER_ID'))
export class HttpError extends Error { constructor(public status: number, message: string) { super(message) } }

export function supabaseUrl() {
  try {
    const url = new URL(env('SUPABASE_URL'))
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.search || url.hash || url.pathname !== '/') throw new Error('Invalid project URL')
    return url.origin
  } catch { throw new HttpError(503, 'SUPABASE_URL is invalid. In Hostinger, use your Supabase project URL (https://your-project.supabase.co), not the dashboard link. Then restart the app.') }
}

export async function upstreamJson(response: Response) {
  try { return await response.json() } catch {
    throw new HttpError(503, 'Supabase returned an unexpected response. Check SUPABASE_URL in Hostinger and confirm your Supabase project is running.')
  }
}

export async function supabase(path: string, options: RequestInit = {}, token?: string) {
  if (!configured()) throw new HttpError(503, 'Admin storage is not configured yet.')
  const credential = token?.trim() || env('SUPABASE_SERVICE_ROLE_KEY')
  const url = supabaseUrl()
  let response: Response
  try { response = await fetch(`${url}${path}`, {
    ...options, cache: 'no-store', signal: AbortSignal.timeout(15000),
    headers: { 'Content-Type': 'application/json', apikey: token ? env('SUPABASE_ANON_KEY') : env('SUPABASE_SERVICE_ROLE_KEY'),
      ...(!credential.startsWith('sb_') ? { Authorization: `Bearer ${credential}` } : {}), ...options.headers },
  }) } catch (error) {
    const name = error instanceof Error ? error.name : ''
    const code = (error as { cause?: { code?: string } })?.cause?.code
    if (name === 'TimeoutError' || name === 'AbortError') throw new HttpError(503, 'The connection to Supabase timed out. Confirm the project is active, then retry.')
    if (code === 'ENOTFOUND' || code === 'EAI_AGAIN') throw new HttpError(503, 'Hostinger could not resolve the Supabase hostname. Check SUPABASE_URL, then restart the app.')
    throw new HttpError(503, 'Hostinger could not connect to Supabase. Check SUPABASE_URL and that the project is active, then restart the app.')
  }
  return response
}

export async function isAdmin() {
  const token = cookies().get(SESSION_COOKIE)?.value
  if (!token || !configured()) return false
  try {
    const response = await supabase('/auth/v1/user', {}, token)
    if (!response.ok) return false
    const user = await upstreamJson(response)
    return user.id === env('ADMIN_USER_ID')
  } catch { return false }
}
export async function requireAdmin() { if (!await isAdmin()) throw new HttpError(401, 'Please sign in again. Your changes have not been saved.') }

export function sameOrigin(request: Request) {
  const expected = env('APP_URL') || (process.env.NODE_ENV !== 'production' ? new URL(request.url).origin : 'https://amouzoun.dev')
  let origin: string
  try { origin = new URL(expected).origin } catch { throw new HttpError(503, 'APP_URL is invalid. Set it to your website origin in Hostinger, then restart the app.') }
  if (request.headers.get('origin') !== origin) throw new HttpError(403, 'Request origin is not allowed. Open the website using the hostname configured in APP_URL.')
}

export async function readJson(request: Request, maxBytes = 250000) {
  const reader = request.body?.getReader()
  if (!reader) throw new HttpError(400, 'Request body is required.')
  const chunks: Uint8Array[] = []; let size = 0
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    size += value.byteLength
    if (size > maxBytes) { await reader.cancel(); throw new HttpError(413, 'Request is too large.') }
    chunks.push(value)
  }
  try {
    const value = JSON.parse(Buffer.concat(chunks).toString('utf8'))
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Expected an object')
    return value
  } catch { throw new HttpError(400, 'Invalid JSON object.') }
}

export function apiError(error: unknown) {
  const status = error instanceof HttpError ? error.status : 503
  return Response.json({ error: error instanceof HttpError ? error.message : 'The service is unavailable. Please try again.' }, { status, headers: { 'Cache-Control': 'no-store' } })
}

export async function rateLimit(key: string, limit: number, seconds: number) {
  const bucket = createHash('sha256').update(key).digest('hex')
  const response = await supabase('/rest/v1/rpc/portfolio_rate_limit', { method: 'POST', body: JSON.stringify({ bucket_key: bucket, max_hits: limit, window_seconds: seconds }) })
  if (response.status === 401 || response.status === 403) throw new HttpError(503, 'Supabase rejected the server key. Check SUPABASE_SERVICE_ROLE_KEY in Hostinger; it must be the secret/service-role key from the same project.')
  if (response.status === 404) throw new HttpError(503, 'The database setup is missing. Run database/setup.sql in your Supabase project, then try again.')
  if (!response.ok) throw new HttpError(503, 'The database is not ready. Confirm the Supabase project is active and database/setup.sql completed successfully.')
  const allowed = await upstreamJson(response)
  if (typeof allowed !== 'boolean') throw new HttpError(503, 'Unexpected database response. Verify SUPABASE_URL and run database/setup.sql in that project.')
  if (!allowed) throw new HttpError(429, 'Too many requests. Please try again later.')
}

export async function readContent(): Promise<{ content: Portfolio; revision: number }> {
  const response = await supabase('/rest/v1/portfolio_content?id=eq.main&select=content,revision')
  if (!response.ok) throw new HttpError(503, 'Could not load content. Check the database setup.')
  const rows = await response.json()
  return rows[0] ? { content: validatePortfolio(rows[0].content), revision: rows[0].revision } : { content: defaultPortfolio, revision: 0 }
}

export const publicContent = cache(async (): Promise<Portfolio> => {
  if (!configured()) return defaultPortfolio
  try {
    const { content } = await readContent()
    return { ...content, projects: { ...content.projects, items: content.projects.items.filter(item => item.published) } }
  } catch {
    // Keep the public portfolio available during a database outage; admin reads fail explicitly.
    console.error('Portfolio content unavailable; serving bundled content.')
    return defaultPortfolio
  }
})

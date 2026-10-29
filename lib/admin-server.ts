import 'server-only'
import { cookies } from 'next/headers'
import { createHash } from 'crypto'
import { cache } from 'react'
import { defaultPortfolio, validatePortfolio, type Portfolio } from './portfolio'

export const SESSION_COOKIE = 'portfolio_admin'
export const configured = () => Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY && process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.ADMIN_USER_ID)
export class HttpError extends Error { constructor(public status: number, message: string) { super(message) } }

export async function supabase(path: string, options: RequestInit = {}, token?: string) {
  if (!configured()) throw new HttpError(503, 'Admin storage is not configured yet.')
  const credential = token || process.env.SUPABASE_SERVICE_ROLE_KEY!
  const response = await fetch(`${process.env.SUPABASE_URL}${path}`, {
    ...options, cache: 'no-store', signal: AbortSignal.timeout(15000),
    headers: { 'Content-Type': 'application/json', apikey: token ? process.env.SUPABASE_ANON_KEY! : process.env.SUPABASE_SERVICE_ROLE_KEY!,
      ...(!credential.startsWith('sb_') ? { Authorization: `Bearer ${credential}` } : {}), ...options.headers },
  })
  return response
}

export async function isAdmin() {
  const token = cookies().get(SESSION_COOKIE)?.value
  if (!token || !configured()) return false
  try {
    const response = await supabase('/auth/v1/user', {}, token)
    if (!response.ok) return false
    const user = await response.json()
    return user.id === process.env.ADMIN_USER_ID
  } catch { return false }
}
export async function requireAdmin() { if (!await isAdmin()) throw new HttpError(401, 'Please sign in again. Your changes have not been saved.') }

export function sameOrigin(request: Request) {
  const expected = process.env.APP_URL || (process.env.NODE_ENV !== 'production' ? new URL(request.url).origin : 'https://amouzoun.dev')
  if (!expected || request.headers.get('origin') !== new URL(expected).origin) throw new HttpError(403, 'Request origin is not allowed.')
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
  if (!response.ok) throw new HttpError(503, 'Storage is not ready. Please try again later.')
  if (!(await response.json())) throw new HttpError(429, 'Too many requests. Please try again later.')
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

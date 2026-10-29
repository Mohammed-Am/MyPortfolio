import { cookies } from 'next/headers'
import { apiError, env, HttpError, rateLimit, readJson, sameOrigin, SESSION_COOKIE, supabase, upstreamJson } from '@/lib/admin-server'

export async function POST(request: Request) {
  try {
    sameOrigin(request)
    const body = await readJson(request, 4096)
    if (typeof body.email !== 'string' || typeof body.password !== 'string' || body.email.length > 254 || body.password.length > 256) throw new HttpError(400, 'Enter your email and password.')
    await rateLimit('login-global', 60, 900)
    await rateLimit(`login:${body.email.trim().toLowerCase()}`, 8, 900)
    const response = await supabase('/auth/v1/token?grant_type=password', { method: 'POST', body: JSON.stringify({ email: body.email.trim(), password: body.password }) }, env('SUPABASE_ANON_KEY'))
    const data = await upstreamJson(response)
    if (response.status === 429) throw new HttpError(429, 'Too many sign-in attempts. Please wait before trying again.')
    if (response.status >= 500) throw new HttpError(503, 'Supabase sign-in is temporarily unavailable. Confirm the project is running and retry.')
    if (!response.ok && /invalid api key/i.test(String(data.message || data.msg || ''))) throw new HttpError(503, 'Supabase rejected the public key. Check SUPABASE_ANON_KEY in Hostinger; it must be the publishable/anon key from the same project.')
    if (data.error_code === 'email_not_confirmed') throw new HttpError(401, 'Confirm this account email in Supabase Authentication before signing in.')
    if (!response.ok || data.user?.id !== env('ADMIN_USER_ID') || !data.access_token) throw new HttpError(401, 'Invalid admin credentials. Use the account created in Supabase Authentication, not your Supabase dashboard password.')
    cookies().set(SESSION_COOKIE, data.access_token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/', maxAge: Math.min(data.expires_in || 3600, 3600) })
    return Response.json({ success: true }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) { return apiError(error) }
}

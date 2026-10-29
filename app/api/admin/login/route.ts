import { cookies } from 'next/headers'
import { apiError, HttpError, rateLimit, readJson, sameOrigin, SESSION_COOKIE, supabase } from '@/lib/admin-server'

export async function POST(request: Request) {
  try {
    sameOrigin(request)
    const body = await readJson(request, 4096)
    if (typeof body.email !== 'string' || typeof body.password !== 'string' || body.email.length > 254 || body.password.length > 256) throw new HttpError(400, 'Enter your email and password.')
    await rateLimit('login-global', 60, 900)
    await rateLimit(`login:${body.email.trim().toLowerCase()}`, 8, 900)
    const response = await supabase('/auth/v1/token?grant_type=password', { method: 'POST', body: JSON.stringify({ email: body.email.trim(), password: body.password }) }, process.env.SUPABASE_ANON_KEY)
    const data = await response.json()
    if (!response.ok || data.user?.id !== process.env.ADMIN_USER_ID || !data.access_token) throw new HttpError(401, 'Invalid admin credentials.')
    cookies().set(SESSION_COOKIE, data.access_token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/', maxAge: Math.min(data.expires_in || 3600, 3600) })
    return Response.json({ success: true }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) { return apiError(error) }
}

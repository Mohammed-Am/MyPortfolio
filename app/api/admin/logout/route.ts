import { cookies } from 'next/headers'
import { apiError, sameOrigin, SESSION_COOKIE, supabase } from '@/lib/admin-server'
export async function POST(request: Request) {
  try {
    sameOrigin(request)
    const token = cookies().get(SESSION_COOKIE)?.value
    cookies().delete(SESSION_COOKIE)
    if (token) { try { await supabase('/auth/v1/logout', { method: 'POST' }, token) } catch { /* Local session is already cleared. */ } }
    return Response.json({ success: true })
  } catch (error) { return apiError(error) }
}

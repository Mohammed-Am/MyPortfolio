import { apiError, HttpError, readJson, requireAdmin, sameOrigin, supabase } from '@/lib/admin-server'
export const dynamic = 'force-dynamic'
export async function GET(request: Request) {
  try {
    await requireAdmin()
    const offset = Math.max(0, Math.min(100000, Number(new URL(request.url).searchParams.get('offset')) || 0))
    const response = await supabase(`/rest/v1/portfolio_messages?select=*&order=created_at.desc&limit=50&offset=${Math.floor(offset)}`)
    if (!response.ok) throw new HttpError(503, 'Could not load messages.')
    return Response.json({ messages: await response.json() }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) { return apiError(error) }
}
export async function PATCH(request: Request) {
  try {
    sameOrigin(request); await requireAdmin()
    const { id, status } = await readJson(request, 2048)
    if (typeof id !== 'string' || !/^[0-9a-f-]{36}$/i.test(id) || !['read', 'unread', 'archived'].includes(status)) throw new HttpError(400, 'Invalid message update.')
    const response = await supabase(`/rest/v1/portfolio_messages?id=eq.${id}`, { method: 'PATCH', headers: { Prefer: 'return=representation' }, body: JSON.stringify({ status }) })
    if (!response.ok) throw new HttpError(503, 'Could not update message.')
    const rows = await response.json()
    if (!rows.length) throw new HttpError(404, 'Message not found.')
    return Response.json({ success: true })
  } catch (error) { return apiError(error) }
}

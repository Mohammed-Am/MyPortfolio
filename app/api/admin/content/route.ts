import { apiError, HttpError, readContent, readJson, requireAdmin, sameOrigin, supabase } from '@/lib/admin-server'
import { validatePortfolio } from '@/lib/portfolio'
export const dynamic = 'force-dynamic'
export async function GET() {
  try { await requireAdmin(); return Response.json(await readContent(), { headers: { 'Cache-Control': 'no-store' } }) } catch (error) { return apiError(error) }
}
export async function PUT(request: Request) {
  try {
    sameOrigin(request); await requireAdmin()
    const body = await readJson(request)
    if (!Number.isSafeInteger(body.revision) || body.revision < 0) throw new HttpError(400, 'Invalid content revision.')
    let content
    try { content = validatePortfolio(body.content) } catch (error) { throw new HttpError(400, error instanceof Error ? error.message : 'Invalid content.') }
    const response = await supabase('/rest/v1/rpc/save_portfolio_content', { method: 'POST', body: JSON.stringify({ expected_revision: body.revision, new_content: content }) })
    if (!response.ok) throw new HttpError(503, 'Could not save changes. Please try again.')
    const revision = await response.json()
    if (revision === -1) throw new HttpError(409, 'Content changed in another session. Copy your changes, then reload before saving.')
    return Response.json({ success: true, revision })
  } catch (error) { return apiError(error) }
}

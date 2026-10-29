import { randomUUID } from 'crypto'
import { apiError, HttpError, rateLimit, requireAdmin, sameOrigin, supabase } from '@/lib/admin-server'
import { MAX_MEDIA_BYTES, mediaType } from '@/lib/media'
export const runtime = 'nodejs'
export async function POST(request: Request) {
  try {
    sameOrigin(request); await requireAdmin()
    await rateLimit('media-upload', 60, 3600)
    if (Number(request.headers.get('content-length')) > MAX_MEDIA_BYTES) throw new HttpError(413, 'Files must be 25 MB or smaller.')
    const reader = request.body?.getReader()
    if (!reader) throw new HttpError(400, 'Select a file to upload.')
    const chunks: Uint8Array[] = []; let size = 0
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > MAX_MEDIA_BYTES) { await reader.cancel(); throw new HttpError(413, 'Files must be 25 MB or smaller.') }
      chunks.push(value)
    }
    const bytes = Buffer.concat(chunks)
    const type = mediaType(bytes)
    if (!type) throw new HttpError(415, 'Use a JPG, PNG, WebP, GIF, MP4, or WebM file.')
    const path = `${randomUUID()}.${type.extension}`
    const response = await supabase(`/storage/v1/object/portfolio-media/${path}`, { method: 'POST', headers: { 'Content-Type': type.mime, 'Cache-Control': '3600', 'x-upsert': 'false' }, body: bytes })
    if (!response.ok) throw new HttpError(503, 'Upload failed. Check that the portfolio-media bucket exists, then try again.')
    return Response.json({ url: `${process.env.SUPABASE_URL}/storage/v1/object/public/portfolio-media/${path}`, type: type.mime })
  } catch (error) { return apiError(error) }
}

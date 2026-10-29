export const MAX_MEDIA_BYTES = 25 * 1024 * 1024
// Inspect the file header instead of trusting a filename or supplied MIME type.
export function mediaType(bytes: Uint8Array): { mime: string; extension: string } | null {
  const text = (start: number, end: number) => String.fromCharCode(...Array.from(bytes.slice(start, end)))
  if (bytes.length < 12) return null
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return { mime: 'image/jpeg', extension: 'jpg' }
  if ([137, 80, 78, 71, 13, 10, 26, 10].every((byte, i) => bytes[i] === byte)) return { mime: 'image/png', extension: 'png' }
  if (['GIF87a', 'GIF89a'].includes(text(0, 6))) return { mime: 'image/gif', extension: 'gif' }
  if (text(0, 4) === 'RIFF' && text(8, 12) === 'WEBP') return { mime: 'image/webp', extension: 'webp' }
  if (text(4, 8) === 'ftyp' && ['isom', 'iso2', 'mp41', 'mp42', 'avc1', 'M4V '].includes(text(8, 12))) return { mime: 'video/mp4', extension: 'mp4' }
  if ([0x1a, 0x45, 0xdf, 0xa3].every((byte, i) => bytes[i] === byte) && text(0, Math.min(bytes.length, 128)).includes('webm')) return { mime: 'video/webm', extension: 'webm' }
  return null
}

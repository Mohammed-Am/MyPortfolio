'use client'
import { useEffect, useRef, useState } from 'react'
import { MAX_MEDIA_BYTES } from '@/lib/media'
import { safeUrl } from '@/lib/portfolio'

export default function MediaField({ value, onChange, video, label }: { value: string; onChange: (value: string) => void; video: boolean; label: string }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const input = useRef<HTMLInputElement>(null)
  const latestChange = useRef(onChange)
  latestChange.current = onChange
  const mounted = useRef(true)
  useEffect(() => { mounted.current = true; return () => { mounted.current = false } }, [])
  async function upload(file?: File) {
    if (!file) return
    if (file.size > MAX_MEDIA_BYTES) { setError('Choose a file smaller than 25 MB.'); return }
    setBusy(true); setError('')
    try {
      const response = await fetch('/api/admin/media', { method: 'POST', headers: { 'Content-Type': file.type || 'application/octet-stream' }, body: file })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Upload failed.')
      if (video !== result.type.startsWith('video/')) throw new Error(video ? 'Select a video for this field.' : 'Select an image or GIF for this field.')
      if (mounted.current) latestChange.current(result.url)
    } catch (error) { setError(error instanceof Error ? error.message : 'Upload failed. Try again.') } finally { setBusy(false); if (input.current) input.current.value = '' }
  }
  return <div className="admin-media-field"><label>{label}<input value={value} onChange={event => onChange(event.target.value)} disabled={busy} placeholder={video ? 'https://…/demo.mp4' : 'https://…/image.gif'} /></label><div className="admin-media-upload"><label className="admin-file-label">{busy ? 'Uploading…' : video ? '↑ Upload a video' : '↑ Upload an image or GIF'}<input ref={input} type="file" accept={video ? 'video/mp4,video/webm' : 'image/jpeg,image/png,image/webp,image/gif'} disabled={busy} onChange={event => upload(event.target.files?.[0])} /></label><small>{video ? 'MP4 or WebM' : 'JPG, PNG, WebP, or GIF'} · up to 25 MB</small></div>{value && safeUrl(value, true) && <div className="admin-media-preview">{video ? <video key={value} src={value} controls playsInline preload="metadata" aria-label="Video preview" /> : <img src={value} alt="Uploaded media preview" />}</div>}{error && <p role="alert" className="admin-error">{error}</p>}<small>Uploads are public assets. Save changes to attach this file to your portfolio.</small></div>
}

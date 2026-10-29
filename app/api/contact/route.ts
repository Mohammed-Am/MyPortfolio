import { apiError, configured, HttpError, rateLimit, readJson, sameOrigin, supabase } from '@/lib/admin-server'
export async function POST(request: Request) {
  try {
    sameOrigin(request)
    const body = await readJson(request, 16000)
    if (body.website) return Response.json({ success: true })
    const { name, email, message } = body
    if (typeof name !== 'string' || !name.trim() || name.length > 120 || typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || typeof message !== 'string' || message.trim().length < 10 || message.length > 5000) throw new HttpError(400, 'Enter your name, a valid email, and a message of 10–5,000 characters.')
    // Preserve the existing email delivery while the new inbox is not configured.
    if (!configured()) {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(15000),
        body: JSON.stringify({ access_key: process.env.WEB3FORMS_ACCESS_KEY || '21447d3e-f61c-42f3-b05d-c42bbe415b91', name: name.trim(), email: email.trim(), message: message.trim(), subject: 'New Project Inquiry from Portfolio' }),
      })
      const result = await response.json()
      if (!response.ok || !result.success) throw new HttpError(503, 'Could not send your message. Please email me directly.')
      return Response.json({ success: true })
    }
    await rateLimit('contact-global', 100, 3600)
    await rateLimit(`contact:${email.trim().toLowerCase()}`, 5, 3600)
    const response = await supabase('/rest/v1/portfolio_messages', { method: 'POST', body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }) })
    if (!response.ok) throw new HttpError(503, 'Your message could not be saved. Please try again or email me directly.')
    return Response.json({ success: true })
  } catch (error) { return apiError(error) }
}

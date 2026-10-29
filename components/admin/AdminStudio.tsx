'use client'
import MediaField from './MediaField'
import { useEffect, useState } from 'react'
import { type Portfolio, type Inquiry, type Project } from '@/lib/portfolio'

const tabs = ['Overview', 'Profile', 'Hero', 'About', 'Toolkit', 'Services', 'Projects', 'Contact', 'SEO', 'Sections', 'Appearance', 'Messages'] as const
type Tab = typeof tabs[number]
type Value = string | boolean | Value[] | { [key: string]: Value }
const labels: Record<string, string> = { brand: 'Short display name', photo: 'Profile image URL', bio: 'Biography (blank line between paragraphs)', whatsapp: 'WhatsApp number (country code, digits only)', button: 'Button text', emptyTitle: 'Empty state title', emptyDescription: 'Empty state description', url: 'Website URL', image: 'Cover image or GIF', video: 'Video walkthrough', animations: 'Enable website animations', technologies: 'Technologies (comma separated)', published: 'Publish this project', github: 'GitHub URL', linkedin: 'LinkedIn URL', seo: 'SEO' }
const serviceTemplate = { title: 'New service', description: '' }
const projectTemplate = (): Project => ({ id: crypto.randomUUID(), title: 'Untitled website', description: '', image: '', url: '', technologies: '', published: false, video: '', gallery: [] })

async function api(path: string, options: RequestInit = {}) {
  const response = await fetch(path, { ...options, headers: { 'Content-Type': 'application/json', ...options.headers } })
  const result = await response.json()
  if (!response.ok) throw new Error(result.error || 'Request failed. Please try again.')
  return result
}

function Editor({ value, onChange, path }: { value: Value; onChange: (value: Value) => void; path: string }) {
  if (typeof value === 'boolean') return <label className="admin-check"><input type="checkbox" checked={value} onChange={e => onChange(e.target.checked)} />{labels[path.split('.').pop()!] || path.split('.').pop()}</label>
  if (typeof value === 'string') {
    const key = path.split('.').pop()!
    const label = labels[key] || key.replace(/([A-Z])/g, ' $1')
    if (['photo', 'image', 'video'].includes(key) || path.includes('.gallery.')) return <MediaField value={value} onChange={onChange} video={key === 'video'} label={path.includes('.gallery.') ? 'Gallery image or GIF' : label} />
    return <label>{label}{/description|bio/i.test(key) ? <textarea rows={5} value={value} maxLength={10000} onChange={e => onChange(e.target.value)} /> : <input value={value} maxLength={10000} onChange={e => onChange(e.target.value)} />}{/photo|image/.test(key) && <small>Paste an HTTPS image URL, or a path to an existing file such as /profil.jpg.</small>}</label>
  }
  if (Array.isArray(value)) return <div className="admin-list">{value.map((item, index) => <div key={typeof item === 'object' && !Array.isArray(item) ? String(item.id || index) : index} className="admin-list-item"><div className="admin-row"><span className="admin-eyebrow">{path === 'projects.items' ? 'Website' : 'Item'} {index + 1}</span><div className="admin-actions"><button type="button" className="admin-small" disabled={index === 0} aria-label={`Move item ${index + 1} up`} onClick={() => { const next = [...value]; [next[index - 1], next[index]] = [next[index], next[index - 1]]; onChange(next) }}>↑</button><button type="button" className="admin-small" disabled={index === value.length - 1} aria-label={`Move item ${index + 1} down`} onClick={() => { const next = [...value]; [next[index], next[index + 1]] = [next[index + 1], next[index]]; onChange(next) }}>↓</button><button type="button" className="admin-small danger" onClick={() => { if (window.confirm('Remove this item? It will be removed from the website when you save.')) onChange(value.filter((_, i) => i !== index)) }}>Remove</button></div></div><Editor value={item} path={`${path}.${index}`} onChange={updated => onChange(value.map((entry, i) => i === index ? updated : entry))} /></div>)}<button type="button" className="admin-button secondary" onClick={() => onChange([...value, path === 'projects.items' ? projectTemplate() : path === 'services.items' ? { ...serviceTemplate } : path.endsWith('.gallery') ? '' : 'New skill'])}>+ Add {path === 'projects.items' ? 'website project' : path === 'services.items' ? 'service' : path.endsWith('.gallery') ? 'gallery image or GIF' : 'skill'}</button>{!value.length && <p className="admin-hint">Nothing added yet. Add an item to get started.</p>}</div>
  return <div className="admin-fields">{Object.entries(value).filter(([key]) => key !== 'id').map(([key, entry]) => <Editor key={key} value={entry} path={`${path}.${key}`} onChange={updated => onChange({ ...value, [key]: updated })} />)}</div>
}

export default function AdminStudio() {
  const [tab, setTab] = useState<Tab>('Overview')
  const [content, setContent] = useState<Portfolio | null>(null)
  const [saved, setSaved] = useState('')
  const [revision, setRevision] = useState(0)
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const [messages, setMessages] = useState<Inquiry[]>([])
  const [messageError, setMessageError] = useState('')
  const [messageBusy, setMessageBusy] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const dirty = !!content && JSON.stringify(content) !== saved

  async function load() {
    setError('')
    try { const data = await api('/api/admin/content'); setContent(data.content); setSaved(JSON.stringify(data.content)); setRevision(data.revision) } catch (error) { setError((error as Error).message) }
  }
  async function loadMessages(more = false) {
    setMessageBusy(true); setMessageError('')
    try {
      const data = await api(`/api/admin/messages?offset=${more ? messages.length : 0}`)
      setMessages(previous => more ? [...previous, ...data.messages.filter((item: Inquiry) => !previous.some(old => old.id === item.id))] : data.messages)
      setHasMore(data.messages.length === 50)
    } catch (error) { setMessageError((error as Error).message) } finally { setMessageBusy(false) }
  }
  useEffect(() => { void load(); void loadMessages() }, [])
  useEffect(() => {
    const beforeUnload = (event: BeforeUnloadEvent) => { if (dirty) { event.preventDefault(); event.returnValue = '' } }
    window.addEventListener('beforeunload', beforeUnload)
    return () => window.removeEventListener('beforeunload', beforeUnload)
  }, [dirty])
  async function save() {
    setBusy(true); setError(''); setNotice('')
    const snapshot = JSON.stringify(content)
    try { const result = await api('/api/admin/content', { method: 'PUT', body: JSON.stringify({ content, revision }) }); setSaved(snapshot); setRevision(result.revision); setNotice('Changes saved. Published content is now live; project drafts stay private.') } catch (error) { setError((error as Error).message) } finally { setBusy(false) }
  }
  async function updateMessage(id: string, status: Inquiry['status']) {
    setMessageBusy(true); setMessageError('')
    try { await api('/api/admin/messages', { method: 'PATCH', body: JSON.stringify({ id, status }) }); setMessages(items => items.map(item => item.id === id ? { ...item, status } : item)) } catch (error) { setMessageError((error as Error).message) } finally { setMessageBusy(false) }
  }
  async function logout() {
    if (dirty && !window.confirm('Sign out and discard your unsaved changes?')) return
    try { await api('/api/admin/logout', { method: 'POST' }); window.location.assign('/admin') } catch (error) { setError((error as Error).message) }
  }
  const sectionKey = tab.toLowerCase() as keyof Portfolio
  const filteredMessages = messages.filter(message => (filter === 'all' || message.status === filter) && `${message.name} ${message.email} ${message.message}`.toLowerCase().includes(search.toLowerCase()))
  return <div className="admin-workspace">
    <aside className="admin-sidebar"><a href="/admin" className="admin-brand">m<span> / studio</span></a><p className="admin-eyebrow">Your portfolio, managed</p><nav aria-label="Admin sections">{tabs.map(item => <button key={item} onClick={() => { setTab(item); setNotice('') }} aria-current={tab === item ? 'page' : undefined} className={tab === item ? 'active' : ''}>{item}{item === 'Messages' && messages.some(message => message.status === 'unread') && <span className="admin-count">{messages.filter(message => message.status === 'unread').length}</span>}</button>)}</nav><div className="admin-sidebar-bottom"><a href="/" target="_blank" rel="noopener noreferrer">View live site ↗</a><button onClick={logout}>Sign out</button></div></aside>
    <main className="admin-main"><header className="admin-topbar"><div><span className="admin-eyebrow">Portfolio Studio / {tab}</span><h1>{tab === 'Overview' ? 'Make it yours.' : tab}</h1></div><div className="admin-actions"><span className="admin-save-state">{dirty ? '● Unsaved changes' : 'All changes saved'}</span><button className="admin-button" disabled={busy || !dirty} onClick={save}>{busy ? 'Saving…' : 'Save changes'}</button></div></header>
      {error && <div role="alert" className="admin-error">{error} <button className="admin-small" onClick={() => { if (!dirty || window.confirm('Reload and discard unsaved changes?')) void load() }}>Reload content</button> <a href="/admin" className="underline">Sign in again</a></div>}
      {notice && <p role="status" className="admin-success">{notice}</p>}
      {!content && <p className="admin-card">{error ? 'Content could not be loaded. Check the connection and try again.' : 'Loading your workspace…'}</p>}
      {content && tab === 'Overview' && <><section className="admin-welcome"><div><span className="admin-eyebrow">A little care goes a long way</span><h2>Keep your portfolio<br />moving forward.</h2><p>Update your story, show your latest work, and follow up with people who reach out.</p><button className="admin-button" onClick={() => setTab('Projects')}>Manage website projects →</button></div><div className="admin-monogram" aria-hidden="true">{content.profile.brand.slice(0, 1).toLowerCase()}.</div></section><section className="admin-stats"><button onClick={() => setTab('Projects')}><span>Published websites</span><strong>{content.projects.items.filter(project => project.published).length.toString().padStart(2, '0')}</strong></button><button onClick={() => setTab('Projects')}><span>Project drafts</span><strong>{content.projects.items.filter(project => !project.published).length.toString().padStart(2, '0')}</strong></button><button onClick={() => setTab('Messages')}><span>Unread in loaded messages</span><strong>{messages.filter(message => message.status === 'unread').length.toString().padStart(2, '0')}</strong></button></section>{messageError && <p className="admin-error" role="alert">Inbox: {messageError}</p>}<section className="admin-card"><h2>Your next update</h2><p>Start with your profile and homepage. New projects are drafts by default. Turn on “Publish this project” and save when they are ready.</p><div className="admin-actions"><button className="admin-button secondary" onClick={() => setTab('Hero')}>Edit homepage</button><button className="admin-button secondary" onClick={() => setTab('Messages')}>Open inbox</button></div></section></>}
      {content && !['Overview', 'Messages'].includes(tab) && <section className="admin-card"><div className="admin-section-heading"><h2>{tab === 'SEO' ? 'Search & sharing' : `${tab} settings`}</h2><p>{tab === 'Projects' ? 'Build a showcase with screenshots, animated GIFs, and video walkthroughs. Projects start as drafts; publish and save when ready.' : tab === 'Sections' ? 'Choose which sections appear on your public website.' : 'Edit the fields below, then save your changes to update the portfolio.'}</p></div><fieldset disabled={busy}><Editor value={content[sectionKey] as unknown as Value} path={sectionKey} onChange={value => { setContent({ ...content, [sectionKey]: value }); setNotice('') }} /></fieldset><div className="admin-editor-footer"><button className="admin-button" disabled={busy || !dirty} onClick={save}>{busy ? 'Saving…' : 'Save changes'}</button><button className="admin-button secondary" disabled={!dirty || busy} onClick={() => { if (window.confirm('Discard all unsaved changes?')) { setContent(JSON.parse(saved)); setNotice('Changes discarded.') } }}>Discard changes</button></div></section>}
      {tab === 'Messages' && <section><div className="admin-card admin-inbox-tools"><div><h2>Your inbox</h2><p>New website inquiries appear here. Reply opens your email app. Older Web3Forms messages are not imported.</p></div><div className="admin-actions"><label>Search loaded messages<input placeholder="Name, email, or message…" value={search} onChange={e => setSearch(e.target.value)} /></label><label>Status<select value={filter} onChange={e => setFilter(e.target.value)}><option value="all">All</option><option value="unread">Unread</option><option value="read">Read</option><option value="archived">Archived</option></select></label><button className="admin-button secondary" disabled={messageBusy} onClick={() => loadMessages()}>Refresh</button></div></div>{messageError && <p role="alert" className="admin-error">{messageError}</p>}{messageBusy && <p role="status">Updating inbox…</p>}{!filteredMessages.length && !messageBusy && !messageError && <div className="admin-empty"><span aria-hidden="true">✉</span><h2>{messages.length ? 'No matching messages' : 'Room for your next opportunity'}</h2><p>{messages.length ? 'Try another search or status filter.' : 'Messages sent through your contact form will appear here.'}</p></div>}{filteredMessages.map(message => <article key={message.id} className="admin-card admin-message"><div className="admin-row"><div><h3>{message.name}</h3><a href={`mailto:${message.email}`}>{message.email}</a></div><span className={`admin-status ${message.status}`}>{message.status}</span></div><time dateTime={message.created_at}>{new Date(message.created_at).toLocaleString()}</time><p className="admin-message-body">{message.message}</p><div className="admin-actions"><a className="admin-button secondary" href={`mailto:${message.email}?subject=${encodeURIComponent('Re: Your portfolio inquiry')}`}>Reply by email ↗</a><button className="admin-small" disabled={messageBusy} onClick={() => updateMessage(message.id, message.status === 'unread' ? 'read' : 'unread')}>{message.status === 'unread' ? 'Mark read' : 'Mark unread'}</button><button className="admin-small" disabled={messageBusy} onClick={() => updateMessage(message.id, message.status === 'archived' ? 'read' : 'archived')}>{message.status === 'archived' ? 'Restore' : 'Archive'}</button></div></article>)}{hasMore && <button className="admin-button secondary" disabled={messageBusy} onClick={() => loadMessages(true)}>Load older messages</button>}</section>}
      <footer className="admin-footnote">Portfolio Studio · Changes are saved to your website database.</footer>
    </main>
  </div>
}

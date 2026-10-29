import { configured, isAdmin } from '@/lib/admin-server'
import AdminStudio from '@/components/admin/AdminStudio'
import AdminLogin from '@/components/admin/AdminLogin'
export const dynamic = 'force-dynamic'
export default async function AdminPage() {
  if (!configured()) return <main className="admin-setup"><span className="admin-eyebrow">Portfolio Studio</span><h1>Connect your workspace</h1><p>The admin page is installed. Connect the database and your admin account to start editing.</p><ol><li>Create a Supabase project and run <code>database/setup.sql</code>.</li><li>Create your admin user in Supabase Authentication.</li><li>Add the settings from <code>.env.example</code> to your Hostinger Node.js app.</li><li>Restart the app, then return here to sign in.</li></ol><p>Your public portfolio stays available while setup is incomplete.</p><a className="admin-button secondary" href="/">Back to portfolio</a></main>
  return await isAdmin() ? <AdminStudio /> : <AdminLogin />
}

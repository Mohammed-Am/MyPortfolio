# Portfolio Studio setup on Hostinger

The admin page is `/admin`. It manages profile/social links, hero text, biography,
toolkit, service cards, website projects, section visibility, contact copy, and SEO
titles/descriptions/social image. Upload JPG, PNG, WebP, animated GIF, MP4, or WebM
files (up to 25 MB each), or paste HTTPS media URLs. Projects support a cover,
image/GIF gallery, and video walkthrough. Project drafts are excluded from public
HTML and client data. Uploaded assets are public by URL even while a project is a draft;
upload only media intended for your public portfolio. Removing a field or project
does not delete its stored files; manage unused assets in Supabase Storage.

## Connect persistent storage and login

1. Sign up at [Supabase](https://supabase.com/dashboard), choose **New project**,
   enter a project name such as `my-portfolio`, choose a region near your visitors,
   and create a database password in your password manager. Wait for it to finish.
   In **SQL Editor → New query**, paste all of `database/setup.sql` and click **Run**.
   This creates the content tables, inbox, and `portfolio-media` storage bucket.
2. In **Authentication → Users → Add user**, create an email/password user for yourself
   (confirm the email for this owner account). Copy that
   user's UUID. Disable public signups if this project is only for your portfolio.
3. Find the project URL and keys under the project's **Connect** or **Settings → API**
   panels. In Hostinger's Node.js web app environment settings, configure:
   - `APP_URL`: the exact origin visitors use, e.g. `https://amouzoun.dev` (no path).
   - `SUPABASE_URL`: your project's URL.
   - `SUPABASE_ANON_KEY`: your publishable key or legacy anon key.
   - `SUPABASE_SERVICE_ROLE_KEY`: your secret key or legacy service-role key.
   - `ADMIN_USER_ID`: the UUID from step 2.
4. Build with `npm run build`, start with `npm start`, and restart/redeploy after
   changing environment settings. This requires a Node.js app, not static hosting.
5. Open `https://amouzoun.dev/admin`, sign in, make a small edit, and save.
   Verify it on the public homepage. Send a test inquiry and confirm it in Messages.

Never put the server key in source control, a `NEXT_PUBLIC_` variable, or browser
code. You do not need to send keys or your password in chat. For local development,
copy `.env.example` to `.env.local`, use `APP_URL=http://localhost:3000`, and run
`npm run dev`. Redirect any alternate hostname such as `www` to the configured origin.

## Everyday use

- Save changes publishes your content settings immediately. Changes persist in
  Supabase across app restarts and redeployments.
- Projects start as drafts. Add an image URL, website URL, description and technologies,
  turn on **Publish this project**, and save. Reorder or remove items using their controls.
- Upload screenshots/GIFs as the cover or gallery, and MP4/WebM in **Video walkthrough**.
  Visitors switch between images and video on the project card. Uploads require the
  storage bucket created by the SQL script. Large videos can use an external HTTPS
  direct media URL. YouTube page URLs are not direct video files.
- **Appearance** toggles the site's animations. Reduced-motion preferences disable
  the custom motion automatically; animated GIFs require a click for those visitors.
- Messages supports read/unread, archive/restore, search within loaded messages,
  and loading older messages. **Reply by email** opens your mail application;
  the dashboard itself does not send replies.
- The session lasts up to one hour. If it expires, sign in again in another tab,
  then retry saving in the original tab to keep unsaved edits. Manage password
  recovery through Supabase Authentication. There is no public registration endpoint.
- Simultaneous saves use revision checks: stale edits are rejected instead of silently
  overwriting another session. Copy your edits before reloading on a conflict.

## Contact-form transition

Until all four Supabase/admin settings are present, the existing Web3Forms email
delivery stays active. The admin shows a setup page and does not accept edits.
Once connected, new messages are stored in the private dashboard inbox instead.
Old Web3Forms messages are not imported. Automatic email notifications are not
included; check the inbox or use the visitor's email to reply. A database outage
returns an error to the visitor rather than claiming that a message was received.

## Security and verification

Every admin API validates the session with Supabase and checks the configured user
UUID. Cookies are HTTP-only, same-site, and secure in production. Mutations check
the request origin. Database tables and RPCs deny browser roles; the server key is
used only on the server. Contact input is bounded, includes a honeypot, and uses
persistent email/global rate limits. Login attempts are also rate limited. Consider
Hostinger/WAF limits or CAPTCHA for sustained automated abuse.

Run `npm run build` then `node tests/admin-integration.mjs` for the local API
integration suite. It uses an isolated fake Supabase server; it does not test a
real Supabase deployment or execute the SQL. Live checks in step 5 are still needed.
Use `node tests/admin-integration.mjs --serve` to inspect the fixture dashboard on
port 3100. Fixture credentials are local test data only and never grant live access.

References: [Supabase Auth](https://supabase.com/docs/guides/auth),
[user verification](https://supabase.com/docs/reference/javascript/auth-getuser),
[database access controls](https://supabase.com/docs/guides/database/postgres/row-level-security).

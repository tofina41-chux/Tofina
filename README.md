# Tofina Portfolio 

The live production deployment can be accessed at: tofina-portfolio.vercel.app
A production-ready, secure, full-stack portfolio platform and micro-Content Management System (CMS) built to showcase full-stack web applications, publish professional tech insights, manage media assets, and handle direct client communication.

## Key Features
```
Dynamic Project Showcasing: Full listing layout designed to feature live web platforms like Sanaa-Sync, BizApp_Central, and MyrnA Art Direction with complete metrics, tags, live deployment URLs, and code repository links.

Secure Admin Gateway Console: Cryptographic token isolation powered by a robust backend middleware rule checking custom authentication headers on administrative endpoints.

Hybrid Data Architecture: Low-latency file-system JSON database engines used to host layout and textual structures, integrated seamlessly with a live-streaming cloud pipeline.

Direct-to-Cloud Upload System: An optimized memory buffer middleware setup using Multer to route incoming files straight to Supabase Object Storage buckets without writing data onto the application host disk.

CV & Profile Flipper Sync: Automated administrative modules to instantly swap out public resume PDFs or profile avatar images directly inside the portfolio-assets cloud bucket.

Outbound Communication Pipeline: A fully isolated contact intake form that hooks into Nodemailer to stream customer messages and project inquiries cleanly into the administrator's email inbox.
```

## Technical Stack
Set these in the Vercel project settings (Environment Variables):

- `SUPABASE_URL` — your Supabase project URL (e.g. `https://xyz.supabase.co`)
- `SUPABASE_SERVICE_ROLE_KEY` — service role key (server-side only, **keep secret**)
- `EMAIL_USER` — SMTP username for sending contact emails
- `EMAIL_PASS` — SMTP password
- `EMAIL_HOST` — (optional) SMTP host, defaults to `smtp.gmail.com`
- `EMAIL_PORT` — (optional) SMTP port, defaults to `587`
- `CONTACT_RECEIVER` — (optional) email to forward contact form messages to
- `VITE_API_URL` — public API base URL (e.g. `https://tofina-portfolio.vercel.app`)

Important: Prefix frontend-exposed variables with `VITE_` (already done for `VITE_API_URL`). Do not expose `SUPABASE_SERVICE_ROLE_KEY` in client-side code.

## Local sanity testing (what I ran)
While developing I validated the existing Express dev server running on `http://localhost:5000`:

```powershell
# from repo root
Invoke-RestMethod -Uri 'http://localhost:5000/api/projects' -UseBasicParsing | ConvertTo-Json -Depth 10
Invoke-RestMethod -Uri 'http://localhost:5000/api/blog' -UseBasicParsing | ConvertTo-Json -Depth 10
Invoke-RestMethod -Uri 'http://localhost:5000/api/profile-image' -UseBasicParsing | ConvertTo-Json -Depth 10
Invoke-WebRequest -Uri 'http://localhost:5000/uploads/Cynthia_Wafula_CV.pdf' -Method Head
```

These returned valid JSON and the CV asset returned HTTP 200 on the local server.

## How to deploy to Vercel
1. Push your latest changes to GitHub (this repo).
2. Create a Vercel project and connect the GitHub repo.
3. Use these build settings in Vercel import page:
   - Root Directory: `client`
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add the required environment variables listed above in the Vercel project settings.
5. Deploy — Vercel will build the frontend and expose API routes under the same domain (e.g., `https://<project>.vercel.app/api/projects`).

## Quick git commands
```bash
# from repo root
git add .
git commit -m "Add Vercel API functions and Supabase integration; update client to use API_BASE; add README"
git push origin main
```

## Next steps I can do for you
- Commit and push these changes to GitHub (I can commit/push now if you want).
- Run a local emulation of Vercel functions (optional) before deploying.
- Walk through adding Vercel environment variables via the Vercel UI.

If you want me to push the changes now, say "commit and push" and I'll create the commit and push to `main`.

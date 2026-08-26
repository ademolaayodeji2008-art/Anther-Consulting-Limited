# Anther Consulting Limited — Website

Accounting, Tax & Business Consulting firm website.  
**Frontend:** React 18 + Vite + Tailwind CSS + React Router v6  
**Backend:** Node.js + Express + file-based JSON storage

---

## Project structure

```
/
├── client/          # React/Vite frontend
│   ├── src/
│   │   ├── components/   # Shared UI components (Header, Footer, SEO, etc.)
│   │   ├── components/home/  # Home page sections
│   │   ├── data/         # Static data (partners, etc.)
│   │   ├── hooks/        # useInView scroll hook
│   │   ├── lib/          # api.js — central fetch utility
│   │   ├── pages/        # One file per route
│   │   └── styles/       # Tailwind entry (index.css)
│   ├── public/           # Static assets (favicon, sitemap, robots.txt)
│   ├── .env.example      # Frontend env vars template
│   └── vite.config.js
│
├── server/          # Express API
│   ├── controllers/  # Business logic (contact, blog, newsletter)
│   ├── data/         # JSON storage files (auto-created on first run)
│   ├── routes/       # Express routers
│   ├── utils/        # storage.js — file-based persistence helper
│   ├── .env.example  # Backend env vars template
│   └── server.js
│
└── package.json     # Root scripts (dev, build, start)
```

---

## Local development

### Prerequisites
- Node.js 18+
- npm 9+

### Setup

```bash
# 1. Clone the repo
git clone <repo-url>
cd "Anther Consulting Limited"

# 2. Install all dependencies
npm run install:all

# 3. Configure environment variables
cp server/.env.example server/.env
cp client/.env.example client/.env
# Edit both .env files as needed (defaults work for local dev)

# 4. Start both servers concurrently
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- API health check: http://localhost:5000/api/health

---

## Environment variables

### Backend (`server/.env`)

| Variable | Default | Description |
|---|---|---|
| `PORT` | `5000` | Port the Express server listens on |
| `CLIENT_ORIGIN` | `http://localhost:5173` | Comma-separated allowed CORS origins |
| `NODE_ENV` | `development` | Set to `production` on hosting platforms |
| `SMTP_HOST` | — | SMTP server host (when email is wired up) |
| `SMTP_PORT` | — | SMTP port (usually 587 or 465) |
| `SMTP_USER` | — | SMTP username / email address |
| `SMTP_PASS` | — | SMTP password |
| `CONTACT_RECIPIENT` | — | Where contact form emails are delivered |

### Frontend (`client/.env`)

| Variable | Default | Description |
|---|---|---|
| `VITE_API_URL` | *(empty)* | Backend base URL. Empty = use Vite proxy (dev). Set to `https://your-api.onrender.com` in production for separate deployments |
| `VITE_SITE_URL` | `https://antherconsulting.com.ng` | Canonical domain for SEO meta tags and sitemap |

---

## Production build

### Option A — Same-server deployment (Express serves the frontend)

```bash
# 1. Build the frontend
npm run build           # outputs to client/dist/

# 2. On the server, set environment variables then start Express
NODE_ENV=production node server/server.js
# Express will detect client/dist and serve the SPA + handle /api/* routes
```

### Option B — Separate deployments (recommended for scalability)

**Frontend → Vercel or Netlify**

```bash
# Build command:  npm run build   (runs from /client)
# Output dir:     client/dist
# Root dir:       client
```

Set environment variable on the hosting platform:
```
VITE_API_URL=https://your-backend.onrender.com
VITE_SITE_URL=https://antherconsulting.com.ng
```

Add a rewrite rule for SPA routing:
- **Vercel:** create `client/vercel.json`:
  ```json
  { "rewrites": [{ "source": "/((?!api/).*)", "destination": "/index.html" }] }
  ```
- **Netlify:** create `client/public/_redirects`:
  ```
  /*    /index.html   200
  ```

**Backend → Render (or Railway / Fly.io)**

- Root directory: `server`
- Build command: `npm install`
- Start command: `node server.js`

Set environment variables on Render:
```
NODE_ENV=production
PORT=5000
CLIENT_ORIGIN=https://antherconsulting.com.ng,https://www.antherconsulting.com.ng
```

---

## API endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/blog` | List all blog posts (newest first, no content field) |
| GET | `/api/blog/:slug` | Single post with full content |
| POST | `/api/contact` | Submit contact form `{name, email, phone, subject, message}` |
| POST | `/api/newsletter` | Newsletter subscribe `{email}` |

---

## Deployment checklist

Before going live, work through these steps:

- [ ] Register domain and point DNS to your hosting provider
- [ ] Set `VITE_SITE_URL` to the live domain on the frontend host
- [ ] Set `VITE_API_URL` to the live backend URL on the frontend host
- [ ] Set `CLIENT_ORIGIN` to the live frontend domain on the backend host
- [ ] Set `NODE_ENV=production` on the backend host
- [ ] Update `client/public/sitemap.xml` URLs if the domain changes
- [ ] Upload a real `public/og-image.png` (1200×630px) for Open Graph previews
- [ ] Add real social media profile URLs to `Footer.jsx`
- [ ] Replace LinkedIn `href="#"` placeholders in `TeamCard.jsx` once partner profiles are ready
- [ ] Wire up SMTP credentials to deliver contact form emails
- [ ] Add blog posts via the seeded `server/data/blog.json` file (or build an admin UI)

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend framework | React 18 |
| Build tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Routing | React Router v6 |
| SEO | react-helmet-async |
| Backend | Node.js + Express 4 |
| Persistence | JSON files (server/data/) — swap for MongoDB/PostgreSQL when ready |
| Dev runner | nodemon |

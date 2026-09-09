# GitHub Search App

A full-stack GitHub repository search application. The application source is inside `github-search-app/`.

## Technologies

- React 19 with Vite
- Tailwind CSS
- Node.js with Express
- GitHub Repository Search API

## Setup

```bash
cd github-search-app
npm install
cp .env.example .env
npm run dev
```

Frontend: http://localhost:5173

Backend: http://localhost:4000

Health check: http://localhost:4000/api/health

## Run Separately

Backend:

```bash
cd github-search-app
npm run dev:backend
```

Frontend:

```bash
cd github-search-app
npm run dev:frontend
```

## API

```text
GET /api/repos?query=react&page=1&perPage=12
```

Search is debounced, paginated, validated, and protected from stale responses using `AbortController`. The backend uses an in-memory cache controlled by `CACHE_TTL_SECONDS`.

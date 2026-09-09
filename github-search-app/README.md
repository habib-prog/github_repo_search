# GitHub Search App

A monorepo with a React frontend and an Express backend for searching GitHub repositories.

## Technologies

- React 19 with Vite
- Tailwind CSS
- Node.js with Express
- GitHub Repository Search API

## Project structure

```text
github-search-app/
├── package.json
├── package-lock.json
├── README.md
├── backend/
│   ├── package.json
│   └── src/
│       ├── controllers/
│       │   └── repoController.js
│       ├── services/
│       │   └── repoService.js
│       ├── utils/
│       │   └── pagination.js
│       ├── routes/
│       │   └── repoRoutes.js
│       └── index.js
└── frontend/
    ├── package.json
    ├── package-lock.json
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── components/
        │   ├── Pagination.jsx
        │   ├── RepositoryCard.jsx
        │   └── SearchInput.jsx
        ├── hooks/
        │   └── useRepositorySearch.js
        ├── services/
        │   └── repoApi.js
        ├── App.jsx
        ├── main.jsx
        └── index.css
```

## Setup Instructions

```bash
cd github-search-app
npm install
```

> Important: Run all `npm` commands from this `github-search-app` directory. The parent directory (`github_repo_search`) does not contain a `package.json`.

Optional environment variables can be configured in a root `.env` file. Start by copying `.env.example` to `.env`:

macOS/Linux:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

`CACHE_TTL_SECONDS` controls how long repository responses stay in the backend in-memory cache. `GITHUB_SEARCH_URL` configures the upstream GitHub search endpoint.

## Run Frontend and Backend

Run both applications together from the repository root:

```bash
cd github-search-app
npm run dev
```

Or run them separately in two terminals:

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

Check the current directory with `pwd`. It should end with `/github-search-app`.

The applications will be available at:

- Frontend: http://localhost:5173
- Backend: http://localhost:4000
- Backend health check: http://localhost:4000/api/health

## API

Search repositories with:

```text
GET /api/repos?query=react&page=1&perPage=12
```

The Vite development server proxies `/api` requests to the backend.

## Technical Decisions

- Search requests are debounced by 500ms so the API is not called on every keystroke.
- The backend validates the query and pagination parameters before calling GitHub.
- An in-memory cache reuses results during the backend process for the same query, page, and page size.
- The frontend uses `AbortController` to cancel the previous request when a newer search starts. This prevents an older, slower response from overwriting the latest results.
- The UI includes loading, empty-result, error, and pagination states.

## Assumptions

- The GitHub Repository Search API is publicly accessible from the backend environment.
- No GitHub authentication token is required for this assessment; GitHub rate limits may still apply.
- Search results are sorted by star count in descending order.
- The in-memory cache is intentionally process-local and is suitable for this small assignment. A shared cache would be preferable when running multiple backend instances.

## Handling Out-of-Order API Responses

Each search request receives its own `AbortController`. When a newer query or page request starts, the previous request is aborted. The response is only applied to state if its controller has not been aborted. Therefore, if an older request returns after a newer request, it cannot overwrite the latest search results.

## Production Build

```bash
npm run build:frontend
npm start
```

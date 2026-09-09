# GitHub Search App

A monorepo with a React frontend and an Express backend for searching GitHub repositories. The application source is inside `github-search-app/`.

## Technologies

- React 19 with Vite
- Tailwind CSS
- Node.js with Express
- GitHub Repository Search API

## Project Structure

```text
repository-root/
├── README.md
└── github-search-app/
	├── package.json
	├── package-lock.json
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
cd /Users/apple/Desktop/github_repo_search/github-search-app
npm install
cp .env.example .env
```

> Important: Run all `npm` commands from the `github-search-app` directory. The parent directory (`github_repo_search`) does not contain a `package.json`.

`CACHE_TTL_SECONDS` controls how long repository responses stay in the backend in-memory cache. `GITHUB_SEARCH_URL` configures the upstream GitHub search endpoint.

## Run Frontend and Backend

Run both applications together from the application root:

```bash
cd /Users/apple/Desktop/github_repo_search/github-search-app
npm run dev
```

Or run them separately in two terminals:

Backend:

```bash
cd /Users/apple/Desktop/github_repo_search/github-search-app
npm run dev:backend
```

Frontend:

```bash
cd /Users/apple/Desktop/github_repo_search/github-search-app
npm run dev:frontend
```

Check the current directory with `pwd`. It should end with `/github-search-app`.

The applications will be available at:

- Frontend: http://localhost:5173
- Backend: http://localhost:4000
- Backend health check: http://localhost:4000/api/health

## API

```text
GET /api/repos?query=react&page=1&perPage=12
```

The Vite development server proxies `/api` requests to the backend.

## Technical Decisions

- Search requests are debounced by 500ms so the API is not called on every keystroke.
- The backend validates the query and pagination parameters before calling GitHub.
- An in-memory cache reuses results during the backend process for the same query, page, and page size.
- The frontend uses `AbortController` to cancel the previous request when a newer search starts.
- The UI includes loading, empty-result, error, and pagination states.

## Assumptions

- The GitHub Repository Search API is publicly accessible from the backend environment.
- No GitHub authentication token is required for this assessment; GitHub rate limits may still apply.
- Search results are sorted by star count in descending order.
- The in-memory cache is process-local and suitable for this small assignment.

## Handling Out-of-Order API Responses

Each search request receives its own `AbortController`. When a newer query or page request starts, the previous request is aborted. The response is only applied to state if its controller has not been aborted. Therefore, an older response cannot overwrite the latest search results.

## Production Build

```bash
npm run build:frontend
npm start
```

const cache = new Map();

const getCacheTtl = () => {
  const configuredTtl = Number.parseInt(process.env.CACHE_TTL_SECONDS, 10);

  if (!Number.isFinite(configuredTtl) || configuredTtl < 0) {
    return 0;
  }

  return configuredTtl * 1000;
};

const getGitHubSearchUrl = () => {
  const searchUrl = process.env.GITHUB_SEARCH_URL?.trim();

  if (!searchUrl) {
    const error = new Error("GITHUB_SEARCH_URL is not configured.");
    error.statusCode = 500;
    throw error;
  }

  return searchUrl;
};

export const searchRepositories = async (query, page = 1, perPage = 12) => {
  const normalizedQuery = query?.trim();

  if (!normalizedQuery || normalizedQuery.length < 2) {
    const error = new Error("Search query must contain at least 2 characters.");
    error.statusCode = 400;
    throw error;
  }

  const cacheKey = `${normalizedQuery.toLowerCase()}:${page}:${perPage}`;
  const cachedResult = cache.get(cacheKey);
  const cacheTtl = getCacheTtl();

  // Return a fresh cached response and avoid an unnecessary GitHub request.
  if (cachedResult && Date.now() - cachedResult.createdAt < cacheTtl) {
    return cachedResult.data;
  }

  if (cachedResult) {
    cache.delete(cacheKey);
  }

  const params = new URLSearchParams({
    q: `${normalizedQuery} in:name`,
    page: String(page),
    per_page: String(perPage),
    sort: "stars",
    order: "desc",
  });

  const response = await fetch(`${getGitHubSearchUrl()}?${params}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "github-search-app",
      ...(process.env.GITHUB_TOKEN
        ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
        : {}),
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(
      errorData.message || "GitHub repository search failed.",
    );
    error.statusCode = response.status === 403 ? 429 : 502;
    throw error;
  }

  const data = await response.json();

  // Send only the fields the frontend needs instead of the full GitHub payload.
  const result = {
    totalCount: data.total_count,
    items: data.items.map((repository) => ({
      id: repository.id,
      name: repository.name,
      fullName: repository.full_name,
      ownerName: repository.owner.login,
      description: repository.description,
      htmlUrl: repository.html_url,
      language: repository.language,
      stars: repository.stargazers_count,
      forks: repository.forks_count,
      ownerAvatarUrl: repository.owner.avatar_url,
      updatedAt: repository.updated_at,
    })),
  };

  cache.set(cacheKey, {
    data: result,
    createdAt: Date.now(),
  });

  return result;
};

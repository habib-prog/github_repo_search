export async function searchRepositories(query, page = 1, signal) {
  const params = new URLSearchParams({
    query,
    page: String(page),
    perPage: "12",
  });
  const response = await fetch(`/api/repos?${params}`, { signal });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Unable to search repositories.");
  }

  return response.json();
}

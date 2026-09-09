import { useEffect, useRef, useState } from "react";
import { searchRepositories } from "../services/repoApi.js";

export function useRepositorySearch() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const abortControllerRef = useRef(null);

  useEffect(() => {
    const normalizedQuery = query.trim();

    if (normalizedQuery.length < 2) {
      abortControllerRef.current?.abort();
      setResult(null);
      setError(
        normalizedQuery.length === 1
          ? "Search query must contain at least 2 characters."
          : "",
      );
      setIsLoading(false);
      return undefined;
    }

    const timeoutId = setTimeout(async () => {
      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      setIsLoading(true);
      setError("");

      try {
        const data = await searchRepositories(
          normalizedQuery,
          page,
          controller.signal,
        );

        if (!controller.signal.aborted) {
          setResult(data);
        }
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setResult(null);
          setError(requestError.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query, page]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    setPage(1);
  };

  return {
    query,
    page,
    result,
    isLoading,
    error,
    hasNextPage: result?.items.length === 12,
    handleQueryChange,
    setPage,
  };
}

import { Pagination } from "./components/Pagination.jsx";
import { RepositoryCard } from "./components/RepositoryCard.jsx";
import { SearchInput } from "./components/SearchInput.jsx";
import { useRepositorySearch } from "./hooks/useRepositorySearch.js";

function App() {
  const {
    query,
    page,
    result,
    isLoading,
    error,
    hasNextPage,
    handleQueryChange,
    setPage,
  } = useRepositorySearch();

  return (
    <main className="min-h-screen overflow-x-hidden bg-white px-4 py-10 text-black sm:px-6 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-black">
          GitHub Search
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Find repositories faster.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg">
          Search GitHub repositories from one focused workspace.
        </p>

        <SearchInput onChange={handleQueryChange} value={query} />

        {/* These states keep the user informed while a search is in progress. */}
        {isLoading && <p className="mt-4 text-sm text-gray-600">Loading...</p>}
        {error && <p className="mt-4 text-sm text-black">{error}</p>}

        {result && !isLoading && result.items.length === 0 && (
          <p className="mt-8 text-gray-600">No repo found at such name</p>
        )}

        {result && result.items.length > 0 && (
          <section className="mt-10 sm:mt-12">
            <p className="mb-4 text-sm leading-6 text-gray-600">
              {result.totalCount.toLocaleString()} repositories found
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {result.items.map((repository) => (
                <RepositoryCard key={repository.id} repository={repository} />
              ))}
            </div>

            <Pagination
              hasNextPage={hasNextPage}
              isLoading={isLoading}
              page={page}
              setPage={setPage}
            />
          </section>
        )}
      </div>
    </main>
  );
}

export default App;

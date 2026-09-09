export function Pagination({ hasNextPage, isLoading, page, setPage }) {
  return (
    <div className="mt-8 flex items-center gap-4">
      <button
        className="rounded-lg bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-300"
        disabled={page === 1 || isLoading}
        onClick={() => setPage((currentPage) => currentPage - 1)}
        type="button"
      >
        Previous
      </button>
      <span className="text-sm text-gray-600">Page {page}</span>
      <button
        className="rounded-lg bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-300"
        disabled={!hasNextPage || isLoading}
        onClick={() => setPage((currentPage) => currentPage + 1)}
        type="button"
      >
        Next
      </button>
    </div>
  );
}

export function Pagination({ hasNextPage, isLoading, page, setPage }) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
      <button
        className="min-h-11 flex-1 rounded-lg bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-300 sm:flex-none"
        disabled={page === 1 || isLoading}
        onClick={() => setPage((currentPage) => currentPage - 1)}
        type="button"
      >
        Previous
      </button>
      <span className="order-3 basis-full text-center text-sm text-gray-600 sm:order-0 sm:basis-auto">
        Page {page}
      </span>
      <button
        className="min-h-11 flex-1 rounded-lg bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-300 sm:flex-none"
        disabled={!hasNextPage || isLoading}
        onClick={() => setPage((currentPage) => currentPage + 1)}
        type="button"
      >
        Next
      </button>
    </div>
  );
}

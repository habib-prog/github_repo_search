export function RepositoryCard({ repository }) {
  return (
    <a
      className="min-w-0 rounded-xl border border-gray-300 bg-white p-4 text-black transition hover:border-black hover:shadow-md sm:p-5"
      href={repository.htmlUrl}
      rel="noreferrer"
      target="_blank"
    >
      <h2 className="wrap-break-word font-semibold text-black">
        {repository.fullName}
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        Owner: {repository.ownerName}
      </p>
      <p className="mt-3 line-clamp-3 text-sm text-gray-700">
        {repository.description || "No description provided."}
      </p>
      <p className="mt-5 wrap-break-word text-xs leading-5 text-gray-600">
        {repository.language || "Unknown"} | {repository.stars.toLocaleString()}{" "}
        stars | Updated {new Date(repository.updatedAt).toLocaleDateString()}
      </p>
    </a>
  );
}

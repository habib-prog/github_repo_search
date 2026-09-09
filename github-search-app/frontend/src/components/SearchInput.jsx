export function SearchInput({ onChange, value }) {
  return (
    <input
      aria-label="Search GitHub repositories"
      className="mt-10 w-full max-w-2xl rounded-lg border border-black bg-white px-4 py-3 text-black outline-none transition focus:ring-2 focus:ring-black"
      onChange={onChange}
      placeholder="Try react, node, or machine learning"
      value={value}
    />
  );
}

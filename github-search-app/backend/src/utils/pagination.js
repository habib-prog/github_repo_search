export const getPagination = (query = {}) => {
  const page = Math.max(Number.parseInt(query.page, 10) || 1, 1);
  const perPage = Math.min(
    Math.max(Number.parseInt(query.perPage, 10) || 12, 1),
    30,
  );

  return { page, perPage };
};

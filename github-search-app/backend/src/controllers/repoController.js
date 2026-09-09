import { searchRepositories } from "../services/repoService.js";
import { getPagination } from "../utils/pagination.js";

export const getRepositories = async (request, response, next) => {
  try {
    const { page, perPage } = getPagination(request.query);
    const result = await searchRepositories(request.query.query, page, perPage);

    response.json(result);
  } catch (error) {
    next(error);
  }
};

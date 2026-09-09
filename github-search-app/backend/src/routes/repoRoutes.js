import { Router } from "express";
import { getRepositories } from "../controllers/repoController.js";

const router = Router();

router.get("/", getRepositories);

export default router;

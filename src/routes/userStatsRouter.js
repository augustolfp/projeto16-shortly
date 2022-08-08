import { Router } from "express";
import { getUserStats } from "../controllers/userStatsController.js";
import validateToken from "../middlewares/authCheckMiddleware.js";

const userStatsRouter = Router();

userStatsRouter.get('/users/me', validateToken, getUserStats);

export default userStatsRouter;
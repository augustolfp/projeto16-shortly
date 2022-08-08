import { Router } from "express";
import { getUserStats, rankUsers } from "../controllers/userStatsController.js";
import validateToken from "../middlewares/authCheckMiddleware.js";

const userStatsRouter = Router();

userStatsRouter.get('/users/me', validateToken, getUserStats);
userStatsRouter.get('/ranking', rankUsers);

export default userStatsRouter;
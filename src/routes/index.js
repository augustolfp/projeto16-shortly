import { Router } from "express";
import authRouter from "./authRouter.js";
import urlRouter from "./urlRouter.js";
import userStatsRouter from "./userStatsRouter.js";

const router = Router();

router.use(authRouter);
router.use(urlRouter);
router.use(userStatsRouter);

export default router;
import { Router } from "express";
import { createShortUrl } from "../controllers/urlController.js";
import validateToken from "../middlewares/authCheckMiddleware.js";

const urlRouter = Router();

urlRouter.post('/urls/shorten', validateToken, createShortUrl);

export default urlRouter;
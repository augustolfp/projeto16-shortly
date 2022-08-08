import { Router } from "express";
import { createShortUrl, findUrlById } from "../controllers/urlController.js";
import validateToken from "../middlewares/authCheckMiddleware.js";

const urlRouter = Router();

urlRouter.post('/urls/shorten', validateToken, createShortUrl);
urlRouter.get('/urls/:id', findUrlById);

export default urlRouter;
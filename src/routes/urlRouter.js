import { Router } from "express";
import { createShortUrl } from "../controllers/urlController.js";

const urlRouter = Router();

urlRouter.post('/urls/shorten', createShortUrl);

export default urlRouter;
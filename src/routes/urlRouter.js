import { Router } from "express";
import { createShortUrl, findUrlById, openUrl, deleteUrl} from "../controllers/urlController.js";
import validateToken from "../middlewares/authCheckMiddleware.js";

const urlRouter = Router();

urlRouter.post('/urls/shorten', validateToken, createShortUrl);
urlRouter.get('/urls/:id', findUrlById);
urlRouter.get('/urls/open/:shortUrl', openUrl);
urlRouter.delete('/urls/:id', validateToken, deleteUrl);

export default urlRouter;
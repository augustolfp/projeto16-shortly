import jwt from "jsonwebtoken";

export default async function validateToken(req, res, next) {
    const jwtKey = process.env.JWT_SECRET;
    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if(!token) {
        return res.status(401).send("Token não foi enviado!");
    }
    try{
        const tokenEmbeddedData = jwt.verify(token, jwtKey);

        res.locals.userId = tokenEmbeddedData.userId;
        next();
    }
    catch(error) {
        res.status(401).send(error);
        return;
    }
}
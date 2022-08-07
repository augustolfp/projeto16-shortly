import connection from "../database/database.js";
import { newUrlSchema } from "../schemas/urlSchemas.js";
import { nanoid } from "nanoid";

export async function createShortUrl(req, res) {
    const url = req.body;
    const validation = newUrlSchema.validate(url);

    if(validation.error) {
        return res.status(422).send("Formato da URL enviada está incorreto");
    }

    const shortUrl = nanoid(8);

    try{
        const query = connection.query(`INSERT INTO links ("userId","website","shortUrl") VALUES ($1,$2,$3)`,[1,url.url,shortUrl]);
        res.status(201).send({
            shortUrl: shortUrl
        });
        return;
    }
    catch(error) {
        res.status(401).send("Ocorreu algum erro!");
        return;
    }
}
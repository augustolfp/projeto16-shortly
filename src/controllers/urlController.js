import connection from "../database/database.js";
import { newUrlSchema } from "../schemas/urlSchemas.js";
import { nanoid } from "nanoid";

export async function createShortUrl(req, res) {
    const userId = res.locals.userId;
    const url = req.body;
    const validation = newUrlSchema.validate(url);

    if(validation.error) {
        return res.status(422).send("Formato da URL enviada está incorreto");
    }

    const shortUrl = nanoid(8);

    try{
        const query = connection.query(`INSERT INTO links ("userId","website","shortUrl") VALUES ($1,$2,$3)`,[userId,url.url,shortUrl]);
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

export async function findUrlById(req, res) {
    const id = req.params.id;
    try{
        const query = await connection.query(`SELECT links.id AS id, links."shortUrl" AS "shortUrl", links.website AS url FROM links WHERE links.id = $1`,[id]);

        if(query.rows.length === 0) {
            return res.sendStatus(404);
        }

        return res.status(200).send(query.rows[0]);
    }
    catch(error) {
        return res.status(404).send(error);
    }
}

export async function openUrl(req, res) {
    const shortUrl = req.params.shortUrl;
    try{
        const query = await connection.query(`SELECT * FROM links WHERE links."shortUrl" = $1`,[shortUrl]);

        if(query.rows.length === 0) {
            return res.sendStatus(404);
        }
        
        await connection.query(`UPDATE links SET "visitorsCounter" = "visitorsCounter" + 1 WHERE id = $1`, [query.rows[0].id]);
        return res.redirect(query.rows[0].website);
    }

    catch (error) {
        return res.sendStatus(404);
    }
}
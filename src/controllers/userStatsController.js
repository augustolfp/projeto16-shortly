import connection from "../database/database.js";

export async function getUserStats(req, res) {
    const userId = res.locals.userId;

    try{
        const query = await connection.query(`SELECT u.id AS id, u.name AS name, SUM(l."visitorsCounter") AS "visitCount" FROM users u
        JOIN links l ON u.id = l."userId"
		WHERE u.id = $1
		GROUP BY u.id;`,[userId]);

        if(query.rows.length === 0) {
            res.status(404).send("Não foi encontrado dados desse usuário!");
            return;
        }

        const userUrls = await connection.query(`SELECT l.id AS id, l."shortUrl" AS "shortUrl", l.website AS url, l."visitorsCounter" AS "visitCount" FROM links l WHERE l."userId" = $1`,[userId]);

        res.status(200).send({
            ...query.rows[0],
            shortenedUrls: [...userUrls.rows]
        });
        return;
    }
    catch(error) {
        res.status(404).send("ocorreu um erro!");
        return;
    }
}

export async function rankUsers(req, res) {
    try {
        const query = await connection.query(`SELECT u.id AS id, u.name AS name, COUNT(l.id) AS "linksCount", SUM(l."visitorsCounter") AS "visitCount" 
        FROM users u LEFT JOIN links l ON u.id = l."userId" GROUP BY u.id ORDER BY "visitCount" DESC LIMIT 10`);
        res.status(200).send(query.rows);
        return;
    }
    catch(error) {
        res.status(404).send("Ocorreu um erro!");
    }
}
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

        res.status(200).send(query.rows);
        return;
    }
    catch(error) {
        res.status(404).send("ocorreu um erro!");
        return;
    }
}
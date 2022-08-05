import connection from "../database/database.js";

export async function createUser(req, res) {
    const newUser = req.body;
    try {
        const query = await connection.query('INSERT INTO users ("name", "email", "password") VALUES ($1,$2,$3)',[newUser.name,newUser.email,newUser.password]);
        return res.sendStatus(201);
    }
    catch(error) {
        return res.send(error).status(400);
    }
}
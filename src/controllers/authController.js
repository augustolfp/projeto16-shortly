import connection from "../database/database.js";
import bcrypt from 'bcrypt';
import { newUserSchema } from "../schemas/authSchemas.js";

export async function createUser(req, res) {
    const newUser = req.body;
    const validation = newUserSchema.validate(newUser);

    if(validation.error) {
        return res.status(422).send(validation.error.details[0].message);
    }


    const encryptedPass = bcrypt.hashSync(newUser.password, 10);
    try {
        const query = await connection.query('INSERT INTO users ("name", "email", "password") VALUES ($1,$2,$3)',[newUser.name,newUser.email,encryptedPass]);
        return res.sendStatus(201);
    }
    catch(error) {
        return res.send(error).status(400);
    }
}
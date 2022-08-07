import connection from "../database/database.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { authUserSchema, newUserSchema } from "../schemas/authSchemas.js";
import dayjs from "dayjs";

export async function createUser(req, res) {
    const newUser = req.body;
    const validation = newUserSchema.validate(newUser);

    if(validation.error) {
        return res.status(422).send(validation.error.details[0].message);
    }

    const encryptedPass = bcrypt.hashSync(newUser.password, 10);
    const query = connection.query('INSERT INTO users ("name", "email", "password") VALUES ($1,$2,$3)',[newUser.name,newUser.email,encryptedPass]);

    query.then(() => {
        res.sendStatus(201);
        return;
    });

    query.catch((error) => {
        res.status(409).send(error);
        return;
    });
}

export async function loginUser(req, res) {
    const authUser = req.body;
    const validation = authUserSchema.validate(authUser);

    if(validation.error) {
        return res.status(422).send(validation.error.details[0].message);
    }

    try{
        const query = await connection.query(`SELECT * FROM users WHERE email = $1`,[authUser.email]);
        
        if(query.rows.length === 0) {
            res.status(401).send("Usuário não cadastrado!");
            return;
        }

        if(!bcrypt.compareSync(authUser.password, query.rows[0].password)) {
            res.status(401).send("Senha incorreta!");
            return;
        }
        const session = await connection.query(`INSERT INTO sessions ("userId","createdAt","token") VALUES ($1,$2,$3)`,[query.rows[0].id,dayjs(),"notoken"]);
        const token = jwt.sign({
            email:authUser.email,
            sessionId: session.id
        }, process.env.JWT_SECRET, {
            expiresIn: 60*30
        });
        res.status(200).send(token);
    }
    catch(error) {
        console.log(error);
        res.status(401).send("Algo errado aconteceu!");
        return;
    }
}
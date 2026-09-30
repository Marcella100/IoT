import brcypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/database.js";

export async function register(req, res) {
    const {name, email, password} = req.body;

    if(
        typeof name !== "string" || name.length <= 3 || 
        typeof email !== "string" || typeof password !== "string"
        ){
            return res.status(400).json({message: "Informe os três campos necessários para o registro"})
        }

        const [users] = await db.query("SELECT id FROM users WHERE email = ?", [email]);

        if(users.length > 0){
            res.status(409).json({message: "Email já cadastrado!"})
        }

        const passwordHash = await brcypt.hash(password, 10);

        try {
            await db.query("INSERT INTO users (name, email, password_hash, role) VALUES(?, ?, ?, ?)", [name, email, passwordHash, "user"]);
        } catch (error) {
            return res.status(400).json({message: "Email já cadastrado"});
        }

        return res.status(201).json({message: "Usuário criado com sucesso!"})
}
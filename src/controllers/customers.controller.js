import { connectionDB } from "../database/db.js";


export async function createCustomer(req, res) {

    const { name, phone , cpf, birthday } = req.body;

    try {
        const customerExist = await connectionDB.query('SELECT id FROM customers WHERE cpf = $1;', [cpf]);
        if(customerExist.rowCount > 0) return res.sendStatus(409);
        
        await connectionDB.query(`
        INSERT INTO customers (name, phone, cpf, birthday) 
        VALUES ($1, $2, $3, $4);
        `, [name, phone, cpf, birthday]);

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
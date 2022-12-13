import { connectionDB } from "../database/db.js";


export async function getCustomer(req, res) {
    const { cpf } = req.query;

    try {
        const params = [];
        let whereQuery = '';

        if (cpf) {
            params.push(`${cpf}%`)
            whereQuery += `WHERE cpf ILIKE $${params.length}`
        }

        const customers = await connectionDB.query(`
          SELECT * FROM customers
          ${whereQuery}
        `, params)

        res.send(customers.rows)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export async function getCustomerById(req, res) {
    const { id } = req.params;
    //console.log(id)


    if (isNaN(parseInt(id))) return res.sendStatus(400);

    try {
        const customerExist = await connectionDB.query(`SELECT * FROM customers WHERE id = $1;`, [id])
        if (customerExist.rowCount === 0) return res.sendStatus(400);

        //console.log(customerExist);
        res.send(customerExist.rows[0])
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }


}


export async function createCustomer(req, res) {

    const { name, phone, cpf, birthday } = req.body;

    try {
        const customerExist = await connectionDB.query('SELECT id FROM customers WHERE cpf = $1;', [cpf]);
        if (customerExist.rowCount > 0) return res.sendStatus(409);

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

export async function updateCustomer(req, res) {
    const { id } = req.params;
    const { name, phone, cpf, birthday } = req.body;

    //console.log("oi")


    if (isNaN(parseInt(id))) return res.sendStatus(400);


    try {
        const updateRefuse = await connectionDB.query('SELECT id FROM customers WHERE cpf = $1 AND id != $2;', [cpf, id]);
        if (updateRefuse.rowCount > 0) return res.sendStatus(409);

        await connectionDB.query(`
        UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 
        WHERE id = $5;
    `, [name, phone, cpf, birthday, id])

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
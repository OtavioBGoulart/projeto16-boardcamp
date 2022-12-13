import { connectionDB } from "../database/db.js";
import dayjs from "dayjs";

export async function getRentals(req, res) {
  const { customerId, gameId } = req.query;

  try {
    const params = [];
    const conditions = [];
    let whereString = '';

    if (customerId) {
      params.push(customerId);
      conditions.push(`rentals."customerId" = $${params.length}`)
    }

    if (gameId) {
      params.push(gameId);
      conditions.push(`rentals."gameId"=$${params.length}`)
    }

    if (params.length > 0) {
      whereString += `WHERE ${conditions.join(" AND ")}`
    }

    const { rows } = await connectionDB.query({
      text: `
        SELECT 
          rentals.*,
          customers.id AS "customerId",
          customers.name AS "customerName",
          games.id AS "gameId",
          games.name AS "gameName",
          games."categoryId" AS "categoryId",
          categories.name AS "categoryName"
        FROM rentals
          JOIN customers ON customers.id=rentals."customerId"
          JOIN games ON games.id=rentals."gameId"
          JOIN categories ON categories.id=games."categoryId"
        ${whereString}
      `,
      //rowMode: "array"
    }, params)

    const rentalstoArray = rows.map(row => {
      return {
				id: row.id,
				customerId: row.customerId,
				gameId: row.gameId,
				rentDate: row.rentDate,
				daysRented: row.daysRented,
				returnDate: row.returnDate,
				returnDate: row.returnDate,
				originalPrice: row.originalPrice,
				delayFee: row.delayFee,
				customer: {
					id: row.customerId,
					name: row.customerName,
				},
				game: {
					id: row.gameId,
					name: row.gameName,
					categoryId: row.categoryId,
					categoryName: row.categoryName,
				},
			}

    })

    console.log(rentalstoArray);

    res.send(rentalstoArray);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function createRental(req, res) {

    const { customerId, gameId, daysRented } = req.body;
    console.log(req.body)

    try {
        const customerExist = await connectionDB.query(`
        SELECT id FROM customers WHERE id = $1;`, [customerId])
        if (customerExist.rowCount === 0) return res.sendStatus(400);

        const gameExist = await connectionDB.query(`
        SELECT * FROM games WHERE id = $1;`, [gameId])
        if (gameExist.rowCount === 0) return res.sendStatus(400);
        const { stockTotal, pricePerDay } = gameExist.rows[0];
        //console.log(gameExist.rows[0]);

        const rentalsQuant = await connectionDB.query(`
        SELECT id FROM rentals WHERE "gameId" = $1 AND "returnDate" IS null;`, [gameId])

        if (rentalsQuant.rowCount > 0 && stockTotal === rentalsQuant.rowCount) {
            return res.sendStatus(400);
        }

        console.log(pricePerDay)
        const originalPrice = pricePerDay * daysRented;
        const rentDate = dayjs().format("DD/MM/YYYY");

        console.log(customerId, gameId, rentDate ,daysRented, originalPrice)

        await connectionDB.query(`
        INSERT INTO rentals (
          "customerId", "gameId", "rentDate", 
          "daysRented", "returnDate", "originalPrice", "delayFee"
        ) VALUES ($1, $2, $3, $4, null, $5, null); 
      `, [customerId, gameId, rentDate ,daysRented, originalPrice])

        res.sendStatus(201);
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}
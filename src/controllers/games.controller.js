import { connectionDB } from "../database/db.js";

export async function getGames(req, res) {
    const { name } = req.query
    console.log(name)
  
    try {
      const params = []
      let whereQuery = ''
  
      if (name) {
        params.push(`${name}%`)
        whereQuery += `WHERE games.name ILIKE $${params.length}`
      }

      console.log(whereQuery)
      console.log(params)
  
      const findGames = await connectionDB.query(`
        SELECT games.*, categories.name AS "categoryName" 
        FROM games
        JOIN categories ON categories.id = games."categoryId"
        ${whereQuery}
      `, params)
  
      res.send(findGames.rows);
    } catch (error) {
      console.log(error)
      res.sendStatus(500)
    }
  }
export async function createGame(req, res) {
    const game = req.body;
    try {
      const gameExist = await connectionDB.query('SELECT id FROM categories WHERE id = $1;', [game.categoryId]);
      if (gameExist.rowCount === 0) {
        return res.sendStatus(400);
      }
  
      await connectionDB.query(`
        INSERT INTO games(name, image, "stockTotal", "categoryId", "pricePerDay")
        VALUES ($1, $2, $3, $4, $5);
      `, [game.name, game.image, Number(game.stockTotal), game.categoryId, Number(game.pricePerDay)]);
  
      res.sendStatus(201)
    } catch (error) {
      console.log(error)
      res.sendStatus(500)
    }
  }

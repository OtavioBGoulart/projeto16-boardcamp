import { connectionDB } from "../database/db.js";

export async function createGame(req, res) {
    const game = req.body;
    try {
      const gameExist = await db.query('SELECT id FROM categories WHERE id = $1;', [game.categoryId]);
      if (gameExist.rowCount === 0) {
        return res.sendStatus(400);
      }
  
      await db.query(`
        INSERT INTO games(name, image, "stockTotal", "categoryId", "pricePerDay")
        VALUES ($1, $2, $3, $4, $5);
      `, [game.name, game.image, Number(game.stockTotal), game.categoryId, Number(game.pricePerDay)]);
  
      res.sendStatus(201)
    } catch (error) {
      console.log(error)
      res.sendStatus(500)
    }
  }
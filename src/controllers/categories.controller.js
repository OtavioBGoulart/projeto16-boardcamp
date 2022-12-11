import { connectionDB } from "../database/db.js";


export async function getCategories(req, res) {
    try {
      const result = await connectionDB.query(`
        SELECT * FROM categories
      `)
      res.send(result.rows)
    } catch (error) {
      console.log(error)
      res.sendStatus(500)
    }
  }
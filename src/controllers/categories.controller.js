import { connectionDB } from "../database/db.js";


export async function getCategories(req, res) {
    try {
      const categories = await connectionDB.query(`
        SELECT * FROM categories;
      `);
      res.send(categories.rows)
    } catch (error) {
      console.log(error)
      res.sendStatus(500)
    }
  }

export async function createCategory(req, res) {
  const category = req.body;

  try {
      const categoryExist = await connectionDB.query('SELECT id FROM categories WHERE name=$1;', [category.name]);
      if (categoryExist.rowCount > 0) return res.sendStatus(409);

      await connectionDB.query('INSERT INTO categories (name) VALUES ($1);', [category.name]);
      res.sendStatus(201);
    }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
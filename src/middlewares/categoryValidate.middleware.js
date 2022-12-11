import categorySchema from "../models/category.schema.js";

export function validateCategory(req, res, next) {
  
    const category = req.body
    const { error } = categorySchema.validate(category)
    
    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send( {message: errors });
    }
  
    next();
  }
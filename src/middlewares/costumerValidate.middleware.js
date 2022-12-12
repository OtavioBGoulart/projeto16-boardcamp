import costumersSchema from "../models/costumers.schema.js";

export function validateCostumer(req, res, next) {

    const costumer = req.body;
    const { error } = costumersSchema.validate(costumer, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send( {message: errors });
    }

    next();
}
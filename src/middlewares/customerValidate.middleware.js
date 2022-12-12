import customersSchema from "../models/customers.schema.js";

export function validateCustomer(req, res, next) {

    const customer = req.body;
    const { error } = customersSchema.validate(customer, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send( {message: errors });
    }

    next();
}
import rentalSchema from "../models/rental.schema.js";

export async function validadeRental(req, res, next) {

    const rental  = req.body;
    console.log("oi");

    const { error } = rentalSchema.validate(rental, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send( {message: errors});
    }

    next();
}
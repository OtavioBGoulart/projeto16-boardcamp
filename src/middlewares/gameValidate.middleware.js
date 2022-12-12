import gameSchema from "../models/game.schema.js";

export function validateGame(req, res, next) {

    const game = req.body;
    const { error } = gameSchema.validate(game, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send( {message: errors});
    }

    next();
}
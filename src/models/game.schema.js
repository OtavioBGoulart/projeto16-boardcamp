import joi from "joi";

const gameSchema =  joi.object({
    name: joi.string().required(),
    image: joi.string().uri().required(),
    stockTotal: joi.string().required(),
    categoryId: joi.number().min(0).required(),
    pricePerDay: joi.string().min(0).required()
})

export default gameSchema;
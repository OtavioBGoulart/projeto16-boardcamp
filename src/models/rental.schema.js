import Joi from "joi"

export const rentalSchema = Joi.object({
  customerId: Joi.number().required(),
  gameId: Joi.number().required(),
  daysRented: Joi.string().min(1).required(),
})

export default rentalSchema;
import Joi from 'joi'

export const createSchema = Joi.object({
	name: Joi.string().min(1).required().label('family name'),
}).required()

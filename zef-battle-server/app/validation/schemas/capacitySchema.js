import Joi from 'joi'

export const createSchema = Joi.object({
	name: Joi.string().min(1).required().label('capacity name'),
	description: Joi.string().label('capacity description'),
}).required()

export const updateSchema = Joi.object({
	name: Joi.string().min(1).required().label('capacity name'),
	description: Joi.string().label('capacity description'),
}).required()

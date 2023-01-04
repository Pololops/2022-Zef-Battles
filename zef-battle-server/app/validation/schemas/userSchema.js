import Joi from 'joi'

export const createSchema = Joi.object({
	name: Joi.string().min(3).required().label('user name'),
	password: Joi.string().min(8).required().label('user password'),
}).required()

export const updateSchema = Joi.object({
	name: Joi.string().min(3).required().label('user name'),
	password: Joi.string().min(8).required().label('user password'),
	victory_number: Joi.number().min(0).label('user victories'),
	role: Joi.string().label('user role'),
}).required()

export const loginSchema = Joi.object({
	login: Joi.string().required().label('user login'),
	password: Joi.string().required().label('user password'),
}).required()


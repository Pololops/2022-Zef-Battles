import Joi from 'joi'

export const createSchema = Joi.object({
	name: Joi.string().min(1).required().label('character name'),
	family_id: Joi.number()
		.integer()
		.min(1)
		.required()
		.label('family id')
		.messages({
			'any.required':
				'Specify the Family_id to indicate the family of this new character',
		}),
}).required()

export const updateSchema = Joi.object({
	name: Joi.string().min(1).required().label('character name'),
	family_id: Joi.number().integer().min(1).required().label('family id'),
}).required()

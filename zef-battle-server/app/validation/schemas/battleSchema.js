import Joi from 'joi'

export const createSchema = Joi.object({
	start_date: Joi.date()
		.timestamp('javascript')
		.min('now')
		.required()
		.label('start date'),
	wished_player_number: Joi.number().min(2).label('number of players'),
}).required()

import Joi from 'joi';

export default Joi.object({
	name: Joi.string().min(1).required().label('character name'),
	family_id: Joi.number()
		.integer()
		.min(1)
		.required()
		.label('character family')
		.messages({
			'any.required':
				'Specify the Family_id to indicate the family of this new character',
		}),
}).required();

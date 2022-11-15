import Joi from 'joi';

export default Joi.object({
	name: Joi.string()
		.min(1)
		.label('capacity name')
		.required(),
	description: Joi.string().label('capacity description'),
}).required();

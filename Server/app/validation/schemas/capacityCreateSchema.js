import Joi from 'joi';

export default Joi.object({
	name: Joi.string()
		.min(1)
		.required()
		.label('capacity name'),
	description: Joi.string().label('capacity description'),
}).required();

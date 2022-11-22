import Joi from 'joi';

export default Joi.object({
	id: Joi.number().label('capacity id'),
	name: Joi.string()
		.min(1)
		.label('capacity name'),
	description: Joi.string().label('capacity description'),
	level: Joi.number().min(0).max(100).label('capacity\'s level for character'),
}).required();

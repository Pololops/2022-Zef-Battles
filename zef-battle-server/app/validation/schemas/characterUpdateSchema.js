import Joi from 'joi';

export default Joi.object({
	name: Joi.string()
		.min(1)
		.label('character name'),
	family_id: Joi.number().integer().min(1),
}).required();

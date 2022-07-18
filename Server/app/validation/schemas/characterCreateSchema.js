import Joi from 'joi';

export default Joi.object({
	name: Joi.string()
		.pattern(
			/^([A-ZÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{1}[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ]*){1}([- ']{1}[A-ZÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{1}[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ]*)*$/,
		)
		.min(1)
		.required()
		.label('character name')
		.messages({
			'string.pattern.base':
				'Each word of the capacity name has to begin with a capital letter',
		}),
	picture: Joi.string().label('character picture'),
	family_id: Joi.number()
		.integer()
		.min(1)
		.required()
		.label('character family')
		.messages({
			'any.required':
				'Choose a family to create a character in it',
		}),
}).required();

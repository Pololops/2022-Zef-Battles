import Joi from 'joi';

export default Joi.object({
	name: Joi.string()
		.pattern(
			/^([A-ZÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{1}[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ]*){1}([- ']{1}[A-ZÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{1}[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ]*)*$/,
		)
		.required()
		.label('family name')
		.messages({
			'string.pattern.base':
				'Each word of the family name has to begin with a capital letter',
		}),
}).required();

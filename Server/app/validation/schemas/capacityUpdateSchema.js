import Joi from 'joi';

export default Joi.object({
	name: Joi.string()
		.pattern(
			/^([A-ZÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{1}[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ]*){1}([- ']{1}[A-ZÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{1}[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ]*)*$/,
		)
		.min(1)
		.label('capacity name')
		.messages({
			'string.pattern.base':
				'Each word of the capacity name has to begin with a capital letter except "et", "de" or similars',
		}),
	description: Joi.string().label('capacity description'),
}).required();

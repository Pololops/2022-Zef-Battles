import Debug from 'debug';
const debug = Debug('Middleware:uploadFile:log');

import ApiError from '../errors/apiError.js';

import multer from 'multer';

export const maxSize = 2 * 1024 * 1024; // = 2 MB

const storage = multer.diskStorage({
	destination: (request, file, cb) => {
		cb(null, process.env.UPLOADS_PATH);
	},
	filename: (request, file, cb) => {
		if (!request.body.name) {
			return cb(
				new ApiError('"character name" is required', {
					statusCode: 400,
				}),
				false,
			);
		}

		const name = request.body.name
			.toLowerCase()
			.replace(' ', '-')
			.replace(/.(?<![a-z0-9-])/g, '');
		const extension = file.originalname.split('.').reverse()[0].toLowerCase();

		const formatName = `${name}.${extension}`;
		cb(null, formatName);
	},
});

const fileFilter = (_, file, cb) => {
	if (
		file.mimetype != 'image/png' &&
		file.mimetype != 'image/jpg' &&
		file.mimetype != 'image/jpeg'
	) {
		return cb(
			new ApiError('Only .png, .jpg and .jpeg format allowed!', {
				statusCode: 415,
			}),
			false,
		);
	}

	cb(null, true);
};

export default multer({
	fileFilter,
	limits: { fileSize: maxSize, files: 1 },
	// storage, //? we let the file in buffer and save it after verification, in the controller
}).single('file'); // .array('file', 2); change single to array to uload 2 or more files

// const util = require('util');
import multer from 'multer';
const maxSize = 2 * 1024 * 1024; // = 2 MB

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/uploads/');
	},
	filename: function (request, file, cb) {
		const baseName = request.body.name
			.toLowerCase()
			.replace(/.(?<![a-z0-9-])/g, '');
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		const extension = file.originalname.split('.').reverse()[0].toLowerCase();

		const fileName = `${baseName}-${uniqueSuffix}.${extension}`;
		cb(null, fileName);
	},
});

export default multer({
	storage: storage,
	limits: { fileSize: maxSize },
}).single('file');

// export default util.promisify(uploadFile);

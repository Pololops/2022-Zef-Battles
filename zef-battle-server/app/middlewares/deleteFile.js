import Debug from 'debug';
const debug = Debug('Middleware:deleteFile:log');

import fs from 'fs';

export default (filename) => {
	const deletedFilePath = process.env.UPLOADS_PATH + '/' + filename;

	fs.access(deletedFilePath, (error) => {
		if (!error) {
			fs.unlink(deletedFilePath, () => debug(`file ${filename} deleted`));
		} else {
			debug(`file ${filename} not found`);
		}
	});
};

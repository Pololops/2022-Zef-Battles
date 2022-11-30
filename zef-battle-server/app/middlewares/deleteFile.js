import Debug from 'debug';
const debug = Debug('Middleware:deleteFile:log');

import { access, unlink } from 'fs';

export default (filename) => {
	const deletedFilePath = `${process.env.UPLOADS_PATH}/${filename}`;

	access(deletedFilePath, (error) => {
		if (!error) {
			unlink(deletedFilePath, () => debug(`file ${filename} deleted`));
		} else {
			debug(`file ${filename} not found`);
		}
	});
};

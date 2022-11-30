import Debug from 'debug';
const debug = Debug('Middleware:saveFile:log');

import { writeFile, access, unlink } from 'fs';

export const saveFile = (filename, fileInBuffer) => {
	const savedFilePath = `${process.env.UPLOADS_PATH}/${filename}`;

	writeFile(savedFilePath, fileInBuffer, (error) => {
		if (!error) {
			debug(`file ${filename} saved`);
		} else {
			debug(`file ${filename} not saved: `, error);
		}
	});
};

export const deleteFile = (filename) => {
	const deletedFilePath = `${process.env.UPLOADS_PATH}/${filename}`;

	access(deletedFilePath, (error) => {
		if (!error) {
			unlink(deletedFilePath, () => debug(`file ${filename} deleted`));
		} else {
			debug(`file ${filename} not found`);
		}
	});
};


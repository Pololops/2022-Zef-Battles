import Debug from 'debug';
const debug = Debug('Middleware:saveFile:log');

import { writeFile } from 'fs';

export default (filename, fileInBuffer) => {
	const savedFilePath = `${process.env.UPLOADS_PATH}/${filename}`;
	
	writeFile(savedFilePath, fileInBuffer, (error) => {
		if (!error) {
			debug(`file ${filename} saved`);
		} else {
			debug(`file ${filename} not saved: `, error);
		}
	});
};

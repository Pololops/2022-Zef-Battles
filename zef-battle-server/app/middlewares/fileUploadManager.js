import Debug from 'debug';
const debug = Debug('Middleware:saveFile:log');

import { writeFile, access, unlink, rename } from 'fs';
import ApiError from '../errors/apiError.js'
import { maxSize } from '../middlewares/uploadFile.js'

export const checkFile = (file) => {
	if (Number(file.size) > maxSize) {
		throw new Error('This image file is too large. 2GB max.', {
			statusCode: 415,
		})
	}

	if (
		file.mimetype !== 'image/png' &&
		file.mimetype !== 'image/jpg' &&
		file.mimetype !== 'image/jpeg' &&
		file.mimetype !== 'image/webp'
	) {
		throw new Error('Only .png, .jpg and .jpeg format allowed!', { statusCode: 415 })
	}
}

export const saveFile = (filename, fileInBuffer) => {
	const savedFilePath = `${process.env.UPLOADS_PATH}/${filename}`

	writeFile(savedFilePath, fileInBuffer, (error) => {
		if (error) {
			throw new ApiError('Internal Server Error : File not saved', {
				statusCode: 500,
			})
		}

		debug(`file ${filename} saved`)
	})
};

export const deleteFile = (filename) => {
	const deletedFilePath = `${process.env.UPLOADS_PATH}/${filename}`

	access(deletedFilePath, (error) => {
		if (error) {
			throw new ApiError('Internal Server Error : File not found', {
				statusCode: 500,
			})
		}

		unlink(deletedFilePath, (error) => {
			if (error) {
				throw new ApiError('Internal Server Error : File not deleted', {
					statusCode: 500,
				})
			}

			debug(`file ${filename} deleted`)
		})
	});
};


import { Router } from 'express'

import errorHandler from '../middlewares/errorHandler.js'
import ApiError from '../errors/apiError.js'

const router = Router()

import apiRouter from './api/index.js'

router.get('/', async (request, response) => {
	return response
		.status(200)
		.json({ hello: `welcome into the Zef's Battle backend API` })
})

router.use('/api', apiRouter)

router.use(() => {
	throw new ApiError('Endpoint not found', { statusCode: 404 })
})

router.use((err, _, response, next) => {
	errorHandler(err, response, next)
})

export default router

import { Router } from 'express'

import apiRouter from './api/index.js'

import errorHandler from '../middlewares/errorHandler.js'
import ApiError from '../errors/apiError.js'

const router = Router()

router.use('/api', apiRouter)

router.use(() => {
	throw new ApiError('Endpoint not found', { statusCode: 404 })
})

router.use((err, _request, response, next) => {
	errorHandler(err, response, next)
})

export default router

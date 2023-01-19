import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import CardsPage from '../components/pages/CardsPage/CardsPage'
import ErrorPage from '../components/pages/ErrorPage/ErrorPage'
import App from '../components/App/App'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: 'families',
				element: <CardsPage />,
				children: [
					{
						path: ':id',
						element: <CardsPage />,
					},
				],
			},
		],
	},
])

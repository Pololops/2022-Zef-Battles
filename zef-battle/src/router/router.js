import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import CardsPage from '../components/pages/CardsPage/CardsPage'
import ErrorPage from '../components/pages/ErrorPage/ErrorPage'
import App from '../components/App/App'
import { getFamilies, getRandomCharacters } from '../apiClient/apiRequests'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		loader: async () => {
			return {
				randomCards: await getRandomCharacters(5),
				allCards: await getFamilies(true)
			}
		},
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

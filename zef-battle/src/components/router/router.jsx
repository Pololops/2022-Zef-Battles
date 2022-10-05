import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import FamiliesPage from '../pages/FamiliesPage/FamiliesPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import App from '../App/App';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: 'families',
				element: <FamiliesPage />,
				children: [
					{
						path: 'families/:id',
						element: <FamiliesPage />,
					},
				],
			},
		],
	},
]);

import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import FamiliesPage from '../components/pages/FamiliesPage/FamiliesPage';
import ErrorPage from '../components/pages/ErrorPage/ErrorPage';
import App from '../components/App/App';

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
						path: ':id',
						element: <FamiliesPage />,
					},
				],
			},
		],
	},
]);

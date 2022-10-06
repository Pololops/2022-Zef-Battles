import React from 'react';
import ReactDOM from 'react-dom/client';
import CardsContextProvider from './contexts/cardsContext';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';

import './styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<CardsContextProvider>
			<RouterProvider router={router} />
		</CardsContextProvider>
	</React.StrictMode>,
);

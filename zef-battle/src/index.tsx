import React from 'react';
import { createRoot } from 'react-dom/client';
import ModalContextProvider from './contexts/modalContext';
import CardsContextProvider from './contexts/cardsContext';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';

import './styles/index.scss';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
	<React.StrictMode>
		<ModalContextProvider>
			<CardsContextProvider>
				<RouterProvider router={router} />
			</CardsContextProvider>
		</ModalContextProvider>
	</React.StrictMode>,
);

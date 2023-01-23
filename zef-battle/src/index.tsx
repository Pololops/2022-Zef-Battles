import React from 'react';
import { createRoot } from 'react-dom/client';
import ModalContextProvider from './contexts/modalContext';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';

import './styles/index.scss';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
	<React.StrictMode>
		<ModalContextProvider>
				<RouterProvider router={router} />
		</ModalContextProvider>
	</React.StrictMode>,
);

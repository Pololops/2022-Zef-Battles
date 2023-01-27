import React from 'react';
import { createRoot } from 'react-dom/client';
import LoginContextProvider from './contexts/LoginContext'
import ModalContextProvider from './contexts/ModalContext';
import MessageContextProvider from './contexts/MessageContext';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';

import './styles/index.scss';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
	<React.StrictMode>
		<LoginContextProvider>
			<ModalContextProvider>
				<MessageContextProvider>
					<RouterProvider router={router} />
				</MessageContextProvider>
			</ModalContextProvider>
		</LoginContextProvider>
	</React.StrictMode>,
);

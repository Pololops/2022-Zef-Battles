import React from 'react';
import { createRoot } from 'react-dom/client';
import { LoginProvider } from './contexts/LoginContext'
import { ModalProvider } from './contexts/ModalContext';
import { MessageProvider } from './contexts/MessageContext';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';

import './styles/index.scss';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
	<React.StrictMode>
		<LoginProvider>
			<ModalProvider>
				<MessageProvider>
					<RouterProvider router={router} />
				</MessageProvider>
			</ModalProvider>
		</LoginProvider>
	</React.StrictMode>,
);

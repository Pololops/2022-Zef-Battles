import './Main.scss';
import type { ReactNode } from 'react';

interface Props {
	children: ReactNode
}

export default function Main({children}: Props) {
  return (
		<main className="main">
			{children}
		</main>
	);
}
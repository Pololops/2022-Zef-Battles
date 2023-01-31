import './Main.scss';

export default function Main({ children }: React.PropsWithChildren) {
  return (
		<main className="main">
			{children}
		</main>
	);
}
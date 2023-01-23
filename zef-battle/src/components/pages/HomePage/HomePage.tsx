import { useLoaderData } from "react-router-dom";

import Cards from '../../Cards/Cards'
import type { Character } from '../../App/App';

export default function HomePage() {
	const { randomCards: { data } } = useLoaderData() as { randomCards: { data: Character[] | string } }

	return (
		<>
			<h2>Zef's Battles</h2>
			{ 
				typeof data !== 'string'
				? (
						<div className="cards">
							<Cards data={data} />
						</div>
					)
				: data 
			}
		</>
	)
}

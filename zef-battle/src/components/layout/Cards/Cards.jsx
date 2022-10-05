import './Cards.scss';

import Card from './Card';

export default function composant({ data }) {
	return (
		<div className="cards">
			{data.map((item) => (
				<Card
					key={item.name}
					title={item.name}
					imageUrl={item.characters[0].picture}
					isCharacter={false}
				/>
			))}
		</div>
	);
}

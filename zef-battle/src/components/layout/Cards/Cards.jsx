import './Cards.scss';

import Card from './Card';

export default function composant({ data }) {
	return (
		<div className="cards">
			{data.map((item) => (
				<Card
					key={item.id}
					id={item.id}
					title={item.name}
					imageUrl={item.characters[0].picture}
					isFamilyCard={true}
				/>
			))}
		</div>
	);
}

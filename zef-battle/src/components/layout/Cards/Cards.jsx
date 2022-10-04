import './Cards.scss'

import Card from './Card';

export default function composant({ data }) {
  return (
		<div className="cards">
			{data.map((item) => (
				<Card key={item.name} title={item.name} imageUrl={data[0].picture} />
			))}
		</div>
	);
}

import './Cards.scss';

import Card from './Card/Card';

interface Props {
	data: Family[] | Character[]
	isFamilyCard?: boolean
}

export default function Cards({ data, isFamilyCard = false}: Props) {
	return (
		<>
			{data.map(
				(card, index) =>
					card && (
						<Card
							key={card.id + card.name}
							id={card.id}
							index={index}
							title={card.name}
							isFamilyCard={isFamilyCard}
							imageUrl={!!('family_id' in card) ? card.picture : null}
							capacities={!!('family_id' in card) ? card.capacity: null}
							familyId={!!('family_id' in card) ? card.family_id: null}
							familyName={!!('family_id' in card) ? card.family_name: null}
							totalLevel={!!('family_id' in card) ? card.total_level: null}
						/>
					),
			)}
		</>
	)
}

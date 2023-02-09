import './Cards.scss';

import { Card } from '../'

interface Props {
	data: Character[] | Family[]
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
							imageUrl={!!('family_id' in card) ? card.picture : undefined}
							capacities={!!('family_id' in card) ? card.capacity: undefined}
							familyId={!!('family_id' in card) ? card.family_id: undefined}
							familyName={!!('family_id' in card) ? card.family_name: undefined}
							totalLevel={!!('family_id' in card) ? card.total_level: undefined}
						/>
					),
			)}
		</>
	)
}

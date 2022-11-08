import PropTypes from 'prop-types';

import './Cards.scss';

import Card from '../Card/Card';
import PreviousCardsButton from '../PreviousCardsButton/PreviousCardsButton';

export default function Cards({ data, isFamilyCard, familyName, familyId }) {
	const addNewCardIndex = data.length + 4;

	return (
		<div className="cards">
			{!isFamilyCard && <PreviousCardsButton />}
			<Card
				key={isFamilyCard ? 'addNewFamily' : 'addNewCharacter'}
				index={addNewCardIndex}
				isAddCard={true}
				isFamilyCard={isFamilyCard}
				familyName={familyName}
				familyId={familyId}
			/>
			{data.map(
				(item, index) =>
					item && (
						<Card
							key={item.id + item.name}
							id={item.id}
							index={index}
							title={item.name}
							imageUrl={!isFamilyCard ? item.picture : ''}
							capacities={!isFamilyCard ? item.capacity : []}
							familyId={item.family_id}
							familyName={item.family_name}
							totalLevel={item.total_level}
							isFamilyCard={isFamilyCard}
						/>
					),
			)}
		</div>
	);
}

Cards.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
	isFamilyCard: PropTypes.bool,
	familyName: PropTypes.string,
	familyId: PropTypes.number,
};

Cards.defaultProps = {
	isFamilyCard: false,
	familyName: '',
	familyId: 0,
};

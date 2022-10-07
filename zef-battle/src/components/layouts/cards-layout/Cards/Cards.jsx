import './Cards.scss';

import PropTypes from 'prop-types';
import Card from '../Card/Card';

export default function Cards({ data, isFamilyCard, familyName }) {
	const addNewCardIndex = data.length + 4;

	return (
		<div className="cards">
			<Card
				key={isFamilyCard ? 'addNewFamily' : 'addNewCharacter'}
				index={addNewCardIndex}
				isAddCard={true}
				isFamilyCard={isFamilyCard}
				familyName={familyName}
			/>
			{data.map((item, index) => (
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
			))}
		</div>
	);
}

Cards.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
	isFamilyCard: PropTypes.bool,
	familyName: PropTypes.string,
};

Cards.defaultProps = {
	isFamilyCard: false,
	familyName: '',
};

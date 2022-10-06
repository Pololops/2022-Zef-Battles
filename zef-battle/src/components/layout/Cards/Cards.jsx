import './Cards.scss';

import PropTypes from 'prop-types';
import Card from './Card';

export default function Cards({ data, isFamilyCard }) {
	const addNewCardIndex = data.length + 4;

	return (
		<div className="cards">
			<Card
				key={`${addNewCardIndex}addNewCard`}
				index={addNewCardIndex}
				isAddNewCard={true}
				isFamilyCard={isFamilyCard}
			/>
			{data.map((item, index) => (
				<Card
					key={item.id + item.name}
					id={item.id}
					index={index}
					title={item.name}
					imageUrl={!isFamilyCard ? item.picture : ''}
					capacities={!isFamilyCard ? item.capacity : []}
					isFamilyCard={isFamilyCard}
				/>
			))}
		</div>
	);
}

Cards.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
	isFamilyCard: PropTypes.bool,
};

Cards.defaultProps = {
	isFamilyCard: false,
};

import './Cards.scss';

import PropTypes from 'prop-types';
import Card from './Card';

export default function Cards({ data, isFamilyCard }) {
	return (
		<div className="cards">
			{data.map((item, index) => (
				<Card
					key={item.id + item.name}
					id={item.id}
					index={index}
					title={item.name}
					imageUrl={!isFamilyCard ? item.picture : ''}
					capacity={!isFamilyCard ? item.capacity : []}
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
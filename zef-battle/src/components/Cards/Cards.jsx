import PropTypes from 'prop-types';

import './Cards.scss';

import Card from './Card/Card';

export default function Cards({ data, isFamilyCard, familyName, familyId }) {
	return (
		<div className="cards">
			<Card
				key={isFamilyCard ? 'addNewFamily' : 'addNewCharacter'}
				index={0}
				isManageCard={true}
				isFamilyCard={isFamilyCard}
				familyName={familyName}
				familyId={familyId}
			/>

			{!isFamilyCard && data.length < 1 && (
				<Card
					key="removeFamily"
					index={1}
					isManageCard={true}
					isRemoveFamilyCard={true}
					isFamilyCard={true}
					familyName={familyName}
					familyId={familyId}
				/>
			)}

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

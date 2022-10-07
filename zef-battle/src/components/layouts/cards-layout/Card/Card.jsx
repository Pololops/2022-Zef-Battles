import PropTypes from 'prop-types';
import { useState } from 'react';

import CardFrontFace from '../CardFrontFace/CardFrontFace';
import CardBackFace from '../CardBackFace/CardBackFace';
import AddCardFrontFace from '../AddCardFrontFace/AddCardFrontFace';
import AddCardBackFace from '../AddCardBackFace/AddCardBackFace';
import useAppearEffect from '../../../../hooks/useAppearEffect';

export default function Card({
	id,
	index,
	title,
	imageUrl,
	capacities,
	familyId,
	family,
	familyName,
	totalLevel,
	isFamilyCard,
	isAddCard,
}) {
	const [isFlipped, setIsFlipped] = useState(false);
	const isAppeared = useAppearEffect(index);

	const clickHandler = (event) => {
		event.preventDefault();
		if (isFamilyCard && !isAddCard) return;
		if (isAddCard && isFlipped === true) return;

		setIsFlipped((previousSate) => !previousSate);
	};

	return (
		<div
			className={
				'card' +
				(isAddCard ? ' card--add' : '') +
				(isAppeared ? ' fade-in' : ' before-fade-in')
			}
		>
			<div
				className={'card__inner' + (isFlipped ? ' is-flipped' : '')}
				onClick={clickHandler}
			>
				{isAddCard ? (
					<>
						<AddCardFrontFace
							isFamilyCard={isFamilyCard}
							familyName={familyName}
						/>
						<AddCardBackFace
							isFamilyCard={isFamilyCard}
							isActive={isFlipped}
							onCancelButtonClick={() => setIsFlipped(false)}
						/>
					</>
				) : (
					<>
						<CardFrontFace
							id={id}
							title={title}
							imageUrl={imageUrl}
							isFamilyCard={isFamilyCard}
						/>
						{!isFamilyCard && (
							<CardBackFace title={title} capacities={capacities} />
						)}
					</>
				)}
			</div>
		</div>
	);
}

Card.propTypes = {
	id: PropTypes.number,
	index: PropTypes.number.isRequired,
	title: PropTypes.string,
	imageUrl: PropTypes.string,
	capacity: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string,
			level: PropTypes.number,
			description: PropTypes.string,
		}),
	),
	familyId: PropTypes.number,
	family: PropTypes.string,
	familyName: PropTypes.string,
	totalLevel: PropTypes.number,
	isFamilyCard: PropTypes.bool,
	isAddCard: PropTypes.bool,
};

Card.defaultProps = {
	id: 0,
	title: '',
	capacities: [],
	familyId: 0,
	family: '',
	familyName: '',
	totalLevel: 0,
	isFamilyCard: false,
	isAddCard: false,
};

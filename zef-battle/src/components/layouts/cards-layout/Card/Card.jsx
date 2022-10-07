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
	isFamilyCard,
	isAddNewCard,
}) {
	const [isFlipped, setIsFlipped] = useState(false);
	const isAppeared = useAppearEffect(index);

	const clickHandler = (event) => {
		event.preventDefault();
		if (isFamilyCard && !isAddNewCard) return;
		if (isAddNewCard && isFlipped === true) return;

		setIsFlipped((previousSate) => !previousSate);
	};

	return (
		<div
			className={
				'card' +
				(isAddNewCard ? ' card--add' : '') +
				(isAppeared ? ' fade-in' : ' before-fade-in')
			}
		>
			<div
				className={'card__inner' + (isFlipped ? ' is-flipped' : '')}
				onClick={clickHandler}
			>
				{isAddNewCard ? (
					<>
						<AddCardFrontFace isFamilyCard={isFamilyCard} />
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
	isFamilyCard: PropTypes.bool,
	isAddNewCard: PropTypes.bool,
};

Card.defaultProps = {
	id: -1,
	title: '',
	capacities: [],
	isFamilyCard: false,
	isAddNewCard: false,
};

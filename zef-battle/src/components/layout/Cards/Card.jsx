import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import CardFrontFace from './CardFrontFace';
import CardBackFace from './CardBackFace';
import AddCardFrontFace from './AddCardFrontFace';
import AddCardBackFace from './AddCardBackFace';

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
	const [isAppeared, setIsAppeared] = useState(false);

	const clickHandler = (event) => {
		event.preventDefault();
		if (!isFamilyCard || isAddNewCard)
			setIsFlipped((previousSate) => !previousSate);
	};

	useEffect(() => {
		setTimeout(() => {
			setIsAppeared(true);
		}, index * 100);
	}, [index]);

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
					<AddCardFrontFace isFamilyCard={isFamilyCard} />
				) : (
					<CardFrontFace
						id={id}
						title={title}
						imageUrl={imageUrl}
						isFamilyCard={isFamilyCard}
					/>
				)}

				{isAddNewCard ? (
					<AddCardBackFace isFamilyCard={isFamilyCard} />
				) : (
					!isFamilyCard && (
						<CardBackFace title={title} capacities={capacities} />
					)
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

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import defaultImage from '../../../assets/images/card-default-image.png';

export default function Card({ id, index, title, imageUrl, isFamilyCard }) {
	const [isFlipped, setIsFlipped] = useState(false);
	const [isAppeared, setIsAppeared] = useState(false);

	const clickHandler = (event) => {
		event.preventDefault();
		if (!isFamilyCard) setIsFlipped((previousSate) => !previousSate);
	};

	useEffect(() => {
		setTimeout(() => {
			setIsAppeared(true);
		}, index * 100);
	}, [index]);

	return (
		<div className={'card' + (isAppeared ? ' fadein' : ' before-fadein')}>
			<div
				className={'card__inner' + (isFlipped ? ' is-flipped' : '')}
				onClick={clickHandler}
			>
				<div
					className="card__inner__face card__inner__face--front"
					style={{
						backgroundImage: `url("${
							imageUrl && imageUrl !== ('' || '/') ? imageUrl : defaultImage
						}")`,
					}}
				>
					{!isFamilyCard ? (
						<span className="card__inner__face__title">{title}</span>
					) : (
						<Link to={`/families/${id}`}>
							<span className="card__inner__face__title">{title}</span>
						</Link>
					)}
				</div>

				{!isFamilyCard && (
					<div className="card__inner__face card__inner__face--back">
						<span className="card__inner__face__title">{title}</span>
						BACKFACE CARD
					</div>
				)}
			</div>
		</div>
	);
}

Card.propTypes = {
	id: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
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
};

Card.defaultProps = {
	imageUrl: defaultImage,
	capacity: [],
	isFamilyCard: false,
};

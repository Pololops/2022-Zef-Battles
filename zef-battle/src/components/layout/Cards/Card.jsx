import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import defaultImage from '../../../assets/images/card-default-image.png';

export default function Card({ id, title, imageUrl, isFamilyCard }) {
	const [isFlipped, setIsFlipped] = useState(false);

	const clickHandler = (event) => {
		event.preventDefault();
		if (!isFamilyCard) setIsFlipped((previousSate) => !previousSate);
	};

	return (
		<div className="card">
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
						<Link className="card__inner__face__title" to={`/families/:${id}`}>
							{title}
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
	capacity: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		level: PropTypes.number,
		description: PropTypes.string,
	})),
	isFamilyCard: PropTypes.bool,
};

Card.defaultProps = {
	imageUrl: defaultImage,
	capacity: [],
	isFamilyCard: false,
};

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import defaultImage from '../../../../assets/images/card-default-image.png';

export default function CardFrontFace({ id, title, imageUrl, isFamilyCard }) {
	return (
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
	);
}

CardFrontFace.propTypes = {
	id: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	imageUrl: PropTypes.string,
	isFamilyCard: PropTypes.bool,
};

CardFrontFace.defaultProps = {
	imageUrl: defaultImage,
	isFamilyCard: false,
};

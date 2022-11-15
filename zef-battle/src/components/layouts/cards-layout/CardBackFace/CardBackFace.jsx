import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import defaultImage from '../../../../assets/images/card-default-image.png';

export default function CardBackFace({ id, title, imageUrl, isFamilyCard }) {
	return (
		<div
			className="card__inner__face card__inner__face--back"
			style={{
				backgroundImage: `url("${
					imageUrl && imageUrl !== ('' || '/')
						? process.env.REACT_APP_API_BASE_URL + imageUrl
						: !isFamilyCard && defaultImage
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

CardBackFace.propTypes = {
	id: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	imageUrl: PropTypes.string,
	isFamilyCard: PropTypes.bool,
};

CardBackFace.defaultProps = {
	imageUrl: defaultImage,
	isFamilyCard: false,
};

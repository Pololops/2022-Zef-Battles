import PropTypes from 'prop-types';

export default function CardBackFace({ title, capacities }) {
	return (
		<div className="card__inner__face card__inner__face--back">
			<span className="card__inner__face__title">{title}</span>
			BACKFACE CARD
		</div>
	);
}

CardBackFace.propTypes = {
	title: PropTypes.string.isRequired,
	capacities: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string,
			level: PropTypes.number,
			description: PropTypes.string,
		}),
	),
};

CardBackFace.defaultProps = {
	capacities: [],
};

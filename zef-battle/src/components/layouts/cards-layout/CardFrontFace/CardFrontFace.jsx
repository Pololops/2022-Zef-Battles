import PropTypes from 'prop-types';

import Capacity from '../Capacity/Capacity';

export default function CardFrontFace({ title, capacities }) {
	return (
		<div className="card__inner__face card__inner__face--front">
			<span className="card__inner__face__title">{title}</span>
			{capacities.length > 0 &&
				capacities.map(({ id, name, level, description }) => (
					<Capacity
						key={id + name}
						name={name}
						level={level}
						desc={description}
					/>
				))}
		</div>
	);
}

CardFrontFace.propTypes = {
	title: PropTypes.string.isRequired,
	capacities: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string,
			level: PropTypes.number,
			description: PropTypes.string,
		}),
	).isRequired,
};

CardFrontFace.defaultProps = {
	capacities: [],
};

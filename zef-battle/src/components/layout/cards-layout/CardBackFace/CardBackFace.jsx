import PropTypes from 'prop-types';

import Capacity from '../../Capacity/Capacity';

export default function CardBackFace({ title, capacities }) {
	return (
		<div className="card__inner__face card__inner__face--back">
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

CardBackFace.propTypes = {
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

CardBackFace.defaultProps = {
	capacities: [],
};

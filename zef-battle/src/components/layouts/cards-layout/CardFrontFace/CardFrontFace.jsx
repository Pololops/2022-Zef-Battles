import PropTypes from 'prop-types';

import Capacity from '../Capacity/Capacity';

export default function CardFrontFace({ title, capacities }) {
	return (
		<div className="card__inner__face card__inner__face--front">
			<div className="card__inner__face__infos">
				<span className="card__inner__face__title">{title}</span>

				<button className="button button--submit">Modifier</button>

				<form className="form" style={{ display: 'none' }}>
					<button className="button button--submit">
						Ajouter une capacité
					</button>
					<div className="form__buttons">
						<button className="button button--submit">Modifier</button>
						<button className="button button--reset">Supprimer</button>
					</div>
				</form>
			</div>

			<div className="capacities">
				{capacities.length > 0 &&
					capacities.map(({ id, name, level, description }) => (
						<Capacity
							key={id + name}
							name={name}
							level={level}
							desc={description}
						/>
					))}

				<div className="capacity">
					<span className="capacity__label">name</span>
					<div className="capacity__meter">
						<div
							className="capacity__meter__level"
							style={{ width: `50%`, backgroundColor: 'red' }}
						></div>
					</div>
					<div className="capacity__description">desc</div>
				</div>
			</div>
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

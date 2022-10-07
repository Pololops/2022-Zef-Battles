import PropTypes from 'prop-types';

export default function AddCardFrontFace({ isFamilyCard }) {
	return (
		<div className="card__inner__face card__inner__face--front">
			<span>+</span>
			<span>{isFamilyCard ? 'Créer une nouvelle famille' : 'Ajouter un nouveau personnage dans cette famille'}</span>
		</div>
	);
}

AddCardFrontFace.propTypes = {
	isFamilyCard: PropTypes.bool,
};

AddCardFrontFace.defaultProps = {
	isFamilyCard: false,
};

import PropTypes from 'prop-types';

export default function AddCardBackFace({ isFamilyCard }) {
	return (
		<div className="card__inner__face card__inner__face--back">
			{isFamilyCard ? 'Form new family' : 'Form new character'}
		</div>
	);
}

AddCardBackFace.propTypes = {
	isFamilyCard: PropTypes.bool,
};

AddCardBackFace.defaultProps = {
	isFamilyCard: false,
};

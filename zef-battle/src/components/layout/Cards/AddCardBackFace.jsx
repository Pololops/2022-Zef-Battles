import PropTypes from 'prop-types';

import Form from '../form-layout/Form/Form';

export default function AddCardBackFace({ isFamilyCard, isActive }) {
	return (
		<div className="card__inner__face card__inner__face--back">
			{isActive && <Form isFamilyForm={isFamilyCard} isActive={isActive} />}
		</div>
	);
}

AddCardBackFace.propTypes = {
	isFamilyCard: PropTypes.bool,
	isActive: PropTypes.bool,
};

AddCardBackFace.defaultProps = {
	isFamilyCard: false,
	isActive: false,
};

import PropTypes from 'prop-types';

import Form from '../form-layout/Form/Form';

export default function AddCardBackFace({ isFamilyCard, isActive, onCancelButtonClick }) {
	return (
		<div className="card__inner__face card__inner__face--back">
			{isActive && (
				<Form
					isFamilyForm={isFamilyCard}
					isActive={isActive}
					onCancelButtonClick={onCancelButtonClick}
				/>
			)}
		</div>
	);
}

AddCardBackFace.propTypes = {
	isFamilyCard: PropTypes.bool,
	isActive: PropTypes.bool,
	onCancelButtonClick: PropTypes.func,
};

AddCardBackFace.defaultProps = {
	isFamilyCard: false,
	isActive: false,
};

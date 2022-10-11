import PropTypes from 'prop-types';

import Form from '../../form-layout/Form/Form';

export default function AddCardBackFace({
	isFamilyCard,
	familyId,
	isActive,
	formCloser,
}) {
	return (
		<div className="card__inner__face card__inner__face--back">
			<div className="card__inner__face__close" onClick={formCloser}></div>
			<Form
				isFamilyForm={isFamilyCard}
				familyId={familyId}
				isActive={isActive}
				formCloser={formCloser}
			/>
		</div>
	);
}

AddCardBackFace.propTypes = {
	isFamilyCard: PropTypes.bool,
	familyId: PropTypes.number.isRequired,
	isActive: PropTypes.bool,
	formCloser: PropTypes.func,
};

AddCardBackFace.defaultProps = {
	isFamilyCard: false,
	isActive: false,
};

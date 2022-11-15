import PropTypes from 'prop-types';

import Form from '../../form-layout/Form/Form';

export default function AddCardFrontFace({
	isFamilyCard,
	familyId,
	isActive,
	formCloser,
}) {
	return (
		<div className="card__inner__face card__inner__face--front">
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

AddCardFrontFace.propTypes = {
	isFamilyCard: PropTypes.bool,
	familyId: PropTypes.number.isRequired,
	isActive: PropTypes.bool,
	formCloser: PropTypes.func,
};

AddCardFrontFace.defaultProps = {
	isFamilyCard: false,
	isActive: false,
};

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export default function AddCardFrontFace({ isFamilyCard, familyName }) {
	const [singularFamilyName, setSingularFamilyName] = useState('');

	const getSingularFamilyName = () => {
		if (familyName.at(-1) !== 's') return setSingularFamilyName(familyName);

		const arrayOfFamilyName = Array.from(familyName);
		arrayOfFamilyName.splice(-1, 1);

		setSingularFamilyName(arrayOfFamilyName.join(''));
	};

	useEffect(() => {
		getSingularFamilyName();
	}, [familyName]);

	return (
		<div className="card__inner__face card__inner__face--front">
			<span>+</span>
			<span>
				{isFamilyCard
					? 'Créer une nouvelle famille'
					: `Ajouter un nouveau ${
							singularFamilyName.length > 0 ? singularFamilyName : 'personnage'
					  }`}
			</span>
		</div>
	);
}

AddCardFrontFace.propTypes = {
	familyName: PropTypes.string,
	isFamilyCard: PropTypes.bool,
};

AddCardFrontFace.defaultProps = {
	familyName: '',
	isFamilyCard: false,
};

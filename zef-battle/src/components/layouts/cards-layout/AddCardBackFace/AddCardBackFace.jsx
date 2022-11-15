import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export default function AddCardBackFace({ isFamilyCard, familyName }) {
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
		<div className="card__inner__face card__inner__face--back">
			<span>+</span>
			<span>
				{isFamilyCard
					? 'Créer une nouvelle famille'
					: `Créer un nouveau ${
							singularFamilyName.length > 0 ? singularFamilyName : 'personnage'
					  }`}
			</span>
		</div>
	);
}

AddCardBackFace.propTypes = {
	familyName: PropTypes.string,
	isFamilyCard: PropTypes.bool,
};

AddCardBackFace.defaultProps = {
	familyName: '',
	isFamilyCard: false,
};

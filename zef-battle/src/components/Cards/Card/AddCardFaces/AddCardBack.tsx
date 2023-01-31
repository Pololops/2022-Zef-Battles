import { useEffect, useState } from 'react';
import { useMessageContext, MESSAGE } from '../../../../contexts/MessageContext'
import { Message } from '../../..'

interface Props {
	familyName: string
	isFamilyCard: boolean
	isRemoveFamilyCard: boolean
}

export default function AddCardBackFace({
	isFamilyCard,
	familyName,
	isRemoveFamilyCard,
}: Props) {
	const { messageContent, messageToDisplay } = useMessageContext()
	const [singularFamilyName, setSingularFamilyName] = useState('');

	const getLegend = () => {
		let legend = 'Créer une nouvelle famille';

		if (!isFamilyCard) {
			legend = `Créer un nouveau ${
				singularFamilyName.length > 0 ? singularFamilyName : 'personnage'
			}`;
		}

		if (isRemoveFamilyCard) {
			legend = `Supprimer la famille ${familyName}`;
		}

		return legend;
	};

	const getSingularFamilyName = () => {
		if (familyName === '') {
			return setSingularFamilyName('personnage');
		}

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
			<span>{isRemoveFamilyCard ? '×' : '+'}</span>
			<span>{getLegend()}</span>
			{isRemoveFamilyCard && messageToDisplay === MESSAGE.DELETE_FAMILY && messageContent !== '' && <Message />}
		</div>
	);
}

import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';

import './Card.scss';

import CardFrontFace from '../CardFrontFace/CardFrontFace';
import CardBackFace from '../CardBackFace/CardBackFace';
import AddCardFrontFace from '../AddCardFrontFace/AddCardFrontFace';
import AddCardBackFace from '../AddCardBackFace/AddCardBackFace';
import useAppearEffect from '../../../../hooks/useAppearEffect';
import { CardsContext } from '../../../../contexts/cardsContext';
import {
	deleteCharacter,
	getFamilies,
	postCapacity,
} from '../../../../apiClient/apiRequests';

export default function Card({
	id,
	index,
	title,
	imageUrl,
	capacities,
	familyId,
	familyName,
	totalLevel,
	isFamilyCard,
	isAddCard,
}) {
	const { setFamilies } = useContext(CardsContext);

	const [isFlipped, setIsFlipped] = useState(false);
	const [isInEditionMode, setIsInEditionMode] = useState(false);
	const [iskillingProgress, setIskillingProgress] = useState(false);
	const [iskilled, setIskilled] = useState(false);
	
	const isAppeared = useAppearEffect(index);

	const clickCardHandler = (event) => {
		event.preventDefault();
		if (isFamilyCard && !isAddCard) return;
		if (isAddCard && isFlipped) return;
		if (isInEditionMode) return;

		setIsFlipped((previousSate) => !previousSate);
	};

	const clickEditorButtonHandler = (event) => {
		event.stopPropagation();
		setIsInEditionMode((previousSate) => !previousSate);
	};

	const clickCancelEditorButtonHandler = (event) => {
		clickEditorButtonHandler(event);
		setTimeout(() => {
			setIsFlipped((previousSate) => !previousSate);
		}, 50);
	};

	const clickKillCharacterButtonHandler = async (event) => {
		const { statusCode } = await deleteCharacter({ id: id });

		if (statusCode === 204) {
			setIskillingProgress(true);
			clickCancelEditorButtonHandler(event);
			setTimeout(() => setIskilled(true), 600);
			setTimeout(() => {
				setFamilies((previousState) => {
					const newState = [...previousState];

					const characterToDeleteIndex = newState
						.find(({ id }) => id === familyId)
						.characters.findIndex((character) => character.id === id);
						
					newState
						.find(({ id }) => id === familyId)
						.characters.splice(characterToDeleteIndex, 1);

					return [...newState];
				});
			}, 2000);
		}
	};

	useEffect(() => {
		if (!isFlipped && !iskilled) {
			setTimeout(() => setIsInEditionMode(false), 300);
		}
	}, [isFlipped, iskilled]);

	return (
		<div
			className={
				'card' +
				(isAddCard ? ' card--add' : '') +
				(isAppeared ? ' fade-in' : ' before-fade-in') +
				(isInEditionMode ? ' card--edited' : '') +
				(iskillingProgress ? ' card--killing-progress' : '') +
				(iskilled ? ' card--killed' : '')
			}
		>
			<div
				className={'card__inner' + (isFlipped ? ' is-flipped' : '')}
				onClick={clickCardHandler}
			>
				{isAddCard ? (
					<>
						<AddCardFrontFace
							isFamilyCard={isFamilyCard}
							familyId={isFamilyCard ? id : familyId}
							isActive={isFlipped}
							formCloser={() => setIsFlipped(false)}
						/>
						<AddCardBackFace
							isFamilyCard={isFamilyCard}
							familyName={familyName}
						/>
					</>
				) : (
					<>
						{!isFamilyCard && (
							<CardFrontFace
								id={id}
								title={title}
								familyId={familyId}
								capacities={capacities}
								isActive={isFlipped}
								isInEditionMode={isInEditionMode}
								onClickEditorButton={clickEditorButtonHandler}
								onClickCancelEditorButton={clickCancelEditorButtonHandler}
								onClickKillCharacterButton={clickKillCharacterButtonHandler}
							/>
						)}
						<CardBackFace
							id={id}
							title={title}
							imageUrl={imageUrl}
							isFamilyCard={isFamilyCard}
						/>
					</>
				)}
			</div>
		</div>
	);
}

Card.propTypes = {
	id: PropTypes.number,
	index: PropTypes.number.isRequired,
	title: PropTypes.string,
	imageUrl: PropTypes.string,
	capacity: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string,
			level: PropTypes.number,
			description: PropTypes.string,
		}),
	),
	familyId: PropTypes.number,
	family: PropTypes.string,
	familyName: PropTypes.string,
	totalLevel: PropTypes.number,
	isFamilyCard: PropTypes.bool,
	isAddCard: PropTypes.bool,
};

Card.defaultProps = {
	id: 0,
	title: '',
	capacities: [],
	familyId: 0,
	family: '',
	familyName: '',
	totalLevel: 0,
	isFamilyCard: false,
	isAddCard: false,
};

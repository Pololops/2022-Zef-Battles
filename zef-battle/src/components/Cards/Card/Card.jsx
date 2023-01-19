import PropTypes from 'prop-types'
import { useState, useEffect, useContext } from 'react'

import './Card.scss'

import { useNavigate } from 'react-router-dom'

import CardFrontFace from './CardFaces/CardFront'
import CardBackFace from './CardFaces/CardBack'
import AddCardFrontFace from './AddCardFaces/AddCardFront'
import AddCardBackFace from './AddCardFaces/AddCardBack'
import useAppearEffect from '../../../hooks/useAppearEffect'
import { CardsContext } from '../../../contexts/cardsContext'
import {
	deleteCharacter,
	deleteFamily,
} from '../../../apiClient/apiRequests'

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
	isManageCard,
	isRemoveFamilyCard,
}) {
	const { dispatch } = useContext(CardsContext)
	const navigate = useNavigate()

	const [isFlipped, setIsFlipped] = useState(false)
	const [isInEditionMode, setIsInEditionMode] = useState(false)
	const [iskillingProgress, setIskillingProgress] = useState(false)
	const [iskilled, setIskilled] = useState(false)

	const isAppeared = useAppearEffect(index)

	const clickCardHandler = (event) => {
		event.preventDefault()
		if (isRemoveFamilyCard) return clickToDeleteFamily()

		if (isFamilyCard && !isManageCard) return
		if (isManageCard && isFlipped) return
		if (isInEditionMode) return

		setIsFlipped((previousSate) => !previousSate)
	}

	const clickToDeleteFamily = async () => {
		const { statusCode } = await deleteFamily(familyId)

		if (statusCode === 204) {
			dispatch({
				type: 'DELETE_FAMILY_CARD',
				payload: {
					family_id: familyId,
				},
			})
			navigate('/families')
		}
	}

	const clickEditorButtonHandler = (event) => {
		event.stopPropagation()
		setIsInEditionMode((previousSate) => !previousSate)
	}

	const clickCancelEditorButtonHandler = (event) => {
		clickEditorButtonHandler(event)
		setTimeout(() => {
			setIsFlipped((previousSate) => !previousSate)
		}, 50)
	}

	const clickKillCharacterButtonHandler = async (event) => {
		const { statusCode } = await deleteCharacter(id)

		if (statusCode === 204) {
			setIskillingProgress(true)
			clickCancelEditorButtonHandler(event)
			setTimeout(() => setIskilled(true), 600)
			setTimeout(
				() =>
					dispatch({
						type: 'DELETE_CHARACTER_CARD',
						payload: { character_id: id, family_id: familyId },
					}),
				2000,
			)
		}
	}

	useEffect(() => {
		if (!isFlipped && !iskilled) {
			setTimeout(() => setIsInEditionMode(false), 300)
		}
	}, [isFlipped, iskilled])

	return (
		<div
			className={
				'card' +
				(isManageCard ? ' card--manage' : '') +
				(isRemoveFamilyCard ? ' card--remove' : '') +
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
				{isManageCard ? (
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
							isRemoveFamilyCard={isRemoveFamilyCard}
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
	)
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
	isManageCard: PropTypes.bool,
	isRemoveFamilyCard: PropTypes.bool,
}

Card.defaultProps = {
	id: 0,
	title: '',
	capacities: [],
	familyId: 0,
	family: '',
	familyName: '',
	totalLevel: 0,
	isFamilyCard: false,
	isManageCard: false,
	isRemoveFamilyCard: false,
}

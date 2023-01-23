import { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import './Card.scss'

import CardFrontFace from './CardFaces/CardFront'
import CardBackFace from './CardFaces/CardBack'
import AddCardFrontFace from './AddCardFaces/AddCardFront'
import AddCardBackFace from './AddCardFaces/AddCardBack'
import useAppearEffect from '../../../hooks/useAppearEffect'
import {
	deleteCharacter,
	deleteFamily,
} from '../../../apiClient/apiRequests'
import { useCards } from '../../App/App'

interface Props {
	id?: number
	index: number
	title?: string
	imageUrl?: string
	capacities?: Capacity[]
	familyId?: number
	familyName?: string
	totalLevel?: number
	isFamilyCard?: boolean
	isManageCard?: boolean
	isRemoveFamilyCard?: boolean
}

export default function Card({
	id = 0,
	index,
	title = '',
	imageUrl,
	capacities = [],
	familyId = 0,
	familyName = '',
	totalLevel = 0,
	isFamilyCard = false,
	isManageCard = false,
	isRemoveFamilyCard = false,
}: Props) {
	const navigate = useNavigate()

	const { dispatch } = useCards()

	const [isFlipped, setIsFlipped] = useState(false)
	const [isInEditionMode, setIsInEditionMode] = useState(false)
	const [iskillingProgress, setIskillingProgress] = useState(false)
	const [iskilled, setIskilled] = useState(false)

	const isAppeared = useAppearEffect(index)

	const clickCardHandler: React.MouseEventHandler = (event) => {
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

	const clickEditorButtonHandler: React.MouseEventHandler = (event) => {
		event.stopPropagation()
		setIsInEditionMode((previousSate) => !previousSate)
	}

	const clickCancelEditorButtonHandler: React.MouseEventHandler = (event) => {
		clickEditorButtonHandler(event)
		setTimeout(() => {
			setIsFlipped((previousSate) => !previousSate)
		}, 50)
	}

	const clickKillCharacterButtonHandler: React.MouseEventHandler = async (event) => {
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
					1200,
				)
		}
	}

	const formCloserHandler = () => setIsFlipped(false)

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
							formCloser={formCloserHandler}
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

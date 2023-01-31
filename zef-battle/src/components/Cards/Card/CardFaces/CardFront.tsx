import { useState, useContext } from 'react';
import { addCharacterCapacity, removeCharacterCapacity } from '../../../../apiClient/apiRequests'

import { CardCapacity, Button, Input, Message, Form } from '../../../'
import { useCards } from '../../../App/App'
import { MessageContext, MESSAGE } from '../../../../contexts/MessageContext';
import { ModalContext } from '../../../../contexts/ModalContext';

interface Props {
	id: number
	title: string
	familyId: number
	capacities: Capacity[]
	isInEditionMode?: boolean
	onClickEditorButton: React.MouseEventHandler
	onClickCancelEditorButton: React.MouseEventHandler
	onClickKillCharacterButton: React.MouseEventHandler
}

export default function CardFrontFace({
	id,
	title,
	familyId,
	capacities,
	isInEditionMode = false,
	onClickEditorButton,
	onClickCancelEditorButton,
	onClickKillCharacterButton,
}: Props) {
	const { dispatch } = useCards()
	const { messageContent, setMessageContent, messageToDisplay, setMessageToDisplay } = useContext(MessageContext)
	const { setIsModalVisible } = useContext(ModalContext)
	const [capacityNameInputValue, setCapacityNameInputValue] = useState('')
	const [capacityLevelInputValue, setCapacityLevelInputValue] = useState('0')
	const [isInputCapacityFocus, setIsInputCapacityFocus] = useState(true)

	const changeCapacityInputValueHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		setMessageToDisplay(MESSAGE.NONE)
		setMessageContent('')
		setCapacityNameInputValue(event.target.value)
	}

	const changeCapacityLevelInputValueHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		setMessageToDisplay(MESSAGE.NONE)
		setMessageContent('')
		setCapacityLevelInputValue(event.target.value)
	}

	const clickCancelEditorButtonHandler: React.MouseEventHandler = (event) => {
		onClickCancelEditorButton(event)
		setCapacityNameInputValue('')
		setCapacityLevelInputValue('0')
	}

	const clickKillCharacterButtonHandler: React.MouseEventHandler = (event) => {
		onClickKillCharacterButton(event)
		setCapacityNameInputValue('')
		setCapacityLevelInputValue('0')
	}

	const keyPressHandler: React.KeyboardEventHandler = (event) => {
		if (event.key !== 'Enter') return
		return submitCapacityHandler(event)
	}

	const submitCapacityHandler: React.FormEventHandler = async (event) => {
		event.preventDefault()
		if (capacityNameInputValue === '') {
			setMessageToDisplay(MESSAGE.CARD)
			return setMessageContent(`Quelle capacité veux-tu affecter à cette carte ?`)
		}

		const { status, statusCode, data } = await addCharacterCapacity(id, {
			name: capacityNameInputValue,
			level: Number(capacityLevelInputValue),
		})

		if (status !== 'OK' && statusCode === 401) {
			setMessageToDisplay(MESSAGE.MODAL)
			setMessageContent('Connecte-toi pour ajouter, modifier ou supprimer des cartes')
			return setIsModalVisible(true)
		}

		if (status !== 'OK' && statusCode === 403) {
			setMessageToDisplay(MESSAGE.CARD)
			return setMessageContent(`Tu n'as pas le droit de modifier une carte créée par un autre utilisateur`)
		}

		if (status === 'OK' && typeof data !== 'string') {
			dispatch({
				type: 'CREATE_CHARACTER_CAPACITY',
				payload: { ...data, newCapacityName: capacityNameInputValue },
			})
			setCapacityNameInputValue('')
			setCapacityLevelInputValue('0')
		}
	}

	const clickRemoveCapacityHandler = async (event: React.MouseEvent<Element, MouseEvent>, capacityId: number) => {
		event.stopPropagation()

		const { status, statusCode } = await removeCharacterCapacity(id, capacityId)

		if (status !== 'OK' && statusCode === 401) {
			setMessageToDisplay(MESSAGE.MODAL)
			setMessageContent('Connecte-toi pour ajouter, modifier ou supprimer des cartes')
			return setIsModalVisible(true)
		}

		if (status !== 'OK' && statusCode === 403) {
			setMessageToDisplay(MESSAGE.CARD)
			return setMessageContent(`Tu n'as pas le droit de modifier une carte créée par un autre utilisateur`)
		}

		if (status === 'OK') {
			dispatch({
				type: 'DELETE_CHARACTER_CAPACITY',
				payload: {
					capacity_id: capacityId,
					character_id: id,
					family_id: familyId,
				},
			})
		}
	}

	return (
		<div className="card__inner__face card__inner__face--front">
			<div className="card__inner__face__infos">
				<span className="card__inner__face__title">{title}</span>

				{isInEditionMode ? (
					<div className="form__buttons">
						<Button
							type="submit"
							label="Sauver"
							onClick={clickCancelEditorButtonHandler}
						/>
						<Button
							type="reset"
							label="Zigouiller"
							onClick={clickKillCharacterButtonHandler}
						/>
					</div>
				) : (
					<Button
						label="Modifier"
						onClick={onClickEditorButton}
					/>
				)}
			</div>

			<div className="capacities">
				{capacities.length > 0 &&
					capacities.map(({ id, name, level, description }) => (
						<CardCapacity
							key={id + name}
							name={name}
							level={level}
							description={description}
							onClickRemoveButton={(event) =>
								clickRemoveCapacityHandler(event, id)
							}
						/>
					))}

				{isInEditionMode && capacities.length < 4 && (
					<Form className="form form--capacity" name="capacity" onSubmit={submitCapacityHandler}>
						<div>
							<Input
								type="text"
								name="name"
								value={capacityNameInputValue}
								placeholder="Ajouter une capacité"
								autoComplete={false}
								onChange={changeCapacityInputValueHandler}
								onKeyPress={keyPressHandler}
								isFocus={isInputCapacityFocus}
							/>
							{capacityLevelInputValue}
						</div>
						<Input
							type="range"
							name="level"
							value={capacityLevelInputValue}
							onChange={changeCapacityLevelInputValueHandler}
							onMouseDown={() => setIsInputCapacityFocus(false)}
							onMouseUp={() => setIsInputCapacityFocus(true)}
							min={0}
							max={100}
							step={5}
						></Input>
						{messageToDisplay === MESSAGE.CARD && messageContent !== '' && <Message />}
					</Form>						
				)}
			</div>
		</div>
	)
}

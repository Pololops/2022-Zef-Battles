import { useState, useContext } from 'react';
import { addCharacterCapacity, removeCharacterCapacity } from '../../../../apiClient/apiRequests'

import { CardCapacity, Button, Input, Message, Modal } from '../../../'
import { useCards } from '../../../App/App'
import { ModalContext } from '../../../../contexts/modalContext';

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
	const { setIsVisible } = useContext(ModalContext)
	const [capacityNameInputValue, setCapacityNameInputValue] = useState('')
	const [capacityLevelInputValue, setCapacityLevelInputValue] = useState('0')
	const [isInputCapacityFocus, setIsInputCapacityFocus] = useState(true)
	const [errorMessage, setErrorMessage] = useState('')

	const changeCapacityInputValueHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		setErrorMessage('')
		setCapacityNameInputValue(event.target.value)
	}

	const changeCapacityLevelInputValueHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		setErrorMessage('')
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

	const inputKeyPressCapacityHandler: React.KeyboardEventHandler = async (event) => {
		if (event.key === 'Enter') {
			if (capacityNameInputValue === '') {
				return setErrorMessage(`Tu as oublié d'indiquer une capacité.`)
			}

			const { status, statusCode, data } = await addCharacterCapacity(id, {
				name: capacityNameInputValue,
				level: Number(capacityLevelInputValue),
			})

			if (status !== 'OK' && statusCode === 401) return setIsVisible(true)
			if (status !== 'OK' && statusCode === 403) return setErrorMessage(`Tu n'as pas le droit de modifier une carte créée par un autre utilisateur`)

			if (status === 'OK' && typeof data !== 'string') {
				dispatch({
					type: 'CREATE_CHARACTER_CAPACITY',
					payload: { ...data, newCapacityName: capacityNameInputValue },
				})
				setCapacityNameInputValue('')
				setCapacityLevelInputValue('0')
			}
		}
	}

	const clickRemoveCapacityHandler = async (event: React.MouseEvent<Element, MouseEvent>, capacityId: number) => {
		event.stopPropagation()

		const { status, statusCode } = await removeCharacterCapacity(id, capacityId)

		if (status !== 'OK' && statusCode === 401) return setIsVisible(true)
		if (status !== 'OK' && statusCode === 403) return setErrorMessage(`Tu n'as pas le droit de modifier une carte créée par un autre utilisateur`)

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
					<div className="form form--capacity">
						<div>
							<Input
								type="text"
								name="name"
								value={capacityNameInputValue}
								placeholder="Ajouter une capacité"
								autoComplete={false}
								onChange={changeCapacityInputValueHandler}
								onKeyPress={inputKeyPressCapacityHandler}
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
						{errorMessage !== '' && <Message message={errorMessage} />}
					</div>
				)}
			</div>
		</div>
	)
}

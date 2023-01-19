import PropTypes from 'prop-types'

import { useState, useContext } from 'react'
import { CardsContext } from '../../../../contexts/cardsContext'
import {
	addCharacterCapacity,
	removeCharacterCapacity,
} from '../../../../apiClient/apiRequests'

import Capacity from '../../Capacity/Capacity'
import Button from '../../../Forms/Button/Button'
import Input from '../../../Forms/Input/Input'
import Message from '../../../Forms/Message/Message'

export default function CardFrontFace({
	id,
	title,
	familyId,
	capacities,
	isInEditionMode,
	onClickEditorButton,
	onClickCancelEditorButton,
	onClickKillCharacterButton,
}) {
	const { dispatch } = useContext(CardsContext)
	const [capacityNameInputValue, setCapacityNameInputValue] = useState('')
	const [capacityLevelInputValue, setCapacityLevelInputValue] = useState('0')
	const [isInputCapacityFocus, setIsInputCapacityFocus] = useState(true)
	const [errorMessage, setErrorMessage] = useState('')

	const changeCapacityInputValueHandler = (event) => {
		setErrorMessage('')
		setCapacityNameInputValue(event.target.value)
	}

	const changeCapacityLevelInputValueHandler = (event) => {
		setErrorMessage('')
		setCapacityLevelInputValue(event.target.value)
	}

	const clickCancelEditorButtonHandler = (event) => {
		onClickCancelEditorButton(event)
		setCapacityNameInputValue('')
		setCapacityLevelInputValue('0')
	}

	const clickKillCharacterButtonHandler = (event) => {
		onClickKillCharacterButton(event)
		setCapacityNameInputValue('')
		setCapacityLevelInputValue('0')
	}

	const inputKeyPressCapacityHandler = async (event) => {
		if (event.key === 'Enter') {
			if (capacityNameInputValue === '') {
				return setErrorMessage(`Tu as oublié d'indiquer une capacité.`)
			}

			const { statusCode, data } = await addCharacterCapacity(id, {
				name: capacityNameInputValue,
				level: capacityLevelInputValue,
			})

			if (statusCode === 200) {
				dispatch({
					type: 'CREATE_CHARACTER_CAPACITY',
					payload: { ...data, newCapacityName: capacityNameInputValue },
				})
				setCapacityNameInputValue('')
				setCapacityLevelInputValue('0')
			}
		}
	}

	const clickRemoveCapacityHandler = async (event, capacityId) => {
		event.stopPropagation()

		const { statusCode } = await removeCharacterCapacity(id, capacityId)

		if (statusCode === 200) {
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
						type=""
						label="Modifier"
						onClick={onClickEditorButton}
					/>
				)}
			</div>

			<div className="capacities">
				{capacities.length > 0 &&
					capacities.map(({ id, name, level, description }) => (
						<Capacity
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
							min="0"
							max="100"
							step="5"
						></Input>
						{errorMessage !== '' && <Message message={errorMessage} />}
					</div>
				)}
			</div>
		</div>
	)
}

CardFrontFace.propTypes = {
	id: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	familyId: PropTypes.number.isRequired,
	capacities: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string,
			level: PropTypes.number,
			description: PropTypes.string,
		}),
	).isRequired,
	isInEditionMode: PropTypes.bool,
	onClickEditorButton: PropTypes.func.isRequired,
	onClickCancelEditorButton: PropTypes.func.isRequired,
	onClickKillCharacterButton: PropTypes.func.isRequired,
}

CardFrontFace.defaultProps = {
	capacities: [],
	isInEditionMode: false,
}

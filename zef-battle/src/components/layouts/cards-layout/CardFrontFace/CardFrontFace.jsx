import PropTypes from 'prop-types';

import { useState, useContext } from 'react';
import { CardsContext } from '../../../../contexts/cardsContext';
import { getFamilies, postCapacity } from '../../../../apiClient/apiRequests';

import Capacity from '../Capacity/Capacity';
import Button from '../../form-layout/Button/Button';
import Input from '../../form-layout/Input/Input';

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
	const { setFamilies } = useContext(CardsContext);

	const [capacityNameInputValue, setCapacityNameInputValue] = useState('');
	const [capacityLevelInputValue, setCapacityLevelInputValue] = useState(0);

	const changeCapacityInputValueHandler = (event) => {
		setCapacityNameInputValue(event.target.value);
	};

	const clickCancelEditorButtonHandler = (event) => {
		onClickCancelEditorButton(event);
		setCapacityNameInputValue('');
	};

	const clickKillCharacterButtonHandler = (event) => {
		onClickKillCharacterButton(event);
		setCapacityNameInputValue('');
	};

	const inputKeyPressHandler = async (event) => {
		if (event.key === 'Enter') {
			const { statusCode, data } = await postCapacity({ name: capacityNameInputValue });

			if (statusCode === 200) {
				setCapacityNameInputValue('');

				setFamilies((previousState) => {
					const newState = [...previousState];

					newState
						.find(({ id }) => id === familyId)
						.characters.find((character) => character.id === id)
						.capacity.push({
							id: data.id,
							name: data.name,
							level: data.level ?? 0,
							description: data.description ?? '',
						});

					return [...newState];
				});
			}
		}
	};

	return (
		<div className="card__inner__face card__inner__face--front">
			<div className="card__inner__face__infos">
				<span className="card__inner__face__title">{title}</span>

				{isInEditionMode ? (
					<div className="form__buttons">
						<Button
							type=""
							label="Annuler"
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
						type="submit"
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
							desc={description}
						/>
					))}

				{isInEditionMode && capacities.length < 4 && (
					<div className="form form--capacity">
						<Input
							type="text"
							name="name"
							value={capacityNameInputValue}
							placeholder="Ajouter une capacité"
							autoComplete={false}
							onChange={changeCapacityInputValueHandler}
							onKeyPress={inputKeyPressHandler}
							isFocus={true}
						/>
					</div>
				)}
			</div>
		</div>
	);
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
};

CardFrontFace.defaultProps = {
	capacities: [],
	isInEditionMode: false,
};

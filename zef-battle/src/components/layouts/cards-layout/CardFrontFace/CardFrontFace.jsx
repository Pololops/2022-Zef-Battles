import PropTypes from 'prop-types';
import { useState } from 'react';

import Capacity from '../Capacity/Capacity';
import Button from '../../form-layout/Button/Button';
import Input from '../../form-layout/Input/Input';

export default function CardFrontFace({
	title,
	capacities,
	isInEditionMode,
	onClickEditorButton,
	onClickCancelEditorButton,
	clickKillCharacterButtonHandler,
}) {
	const [capacityNameInputValue, setCapacityNameInputValue] = useState('');

	const changeCapacityInputValueHandler = (event) => {
		setCapacityNameInputValue(event.target.value);
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
							onClick={onClickCancelEditorButton}
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
					<form className="form form--capacity">
						<Input
							type="text"
							name="name"
							value={capacityNameInputValue}
							placeholder="Ajouter une capacité"
							autoComplete={false}
							onChange={changeCapacityInputValueHandler}
						/>
					</form>
				)}
			</div>
		</div>
	);
}

CardFrontFace.propTypes = {
	title: PropTypes.string.isRequired,
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
	clickKillCharacterButtonHandler: PropTypes.func.isRequired,
};

CardFrontFace.defaultProps = {
	capacities: [],
	isInEditionMode: false,
};

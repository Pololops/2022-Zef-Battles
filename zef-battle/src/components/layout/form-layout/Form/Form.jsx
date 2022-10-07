import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Input from '../Input/Input';
import Button from '../Button/Button';

export default function Form({ isFamilyForm, onCancelButtonClick, isActive }) {
	const [nameInputValue, setNameInputValue] = useState('');

	const inputChangeHandler = (event, setState) => setState(event.target.value);
	const submitButtonClickHandler = (event) => event.preventDefault();

	useEffect(() => {
		if (isActive) {
			setNameInputValue('');
		}

		return () =>
			setTimeout(() => {
				setNameInputValue('');
			}, 500);
	}, [isActive]);

	return (
		<form
			className={`form ${isFamilyForm ? 'form--family' : 'form--character'}`}
		>
			<Input
				type="text"
				name="name"
				value={nameInputValue}
				placeholder={isFamilyForm ? 'Nom de Famille' : 'Nom du personnage'}
				autoComplete={false}
				onChange={(event) => inputChangeHandler(event, setNameInputValue)}
				isFocus={isActive}
			/>
			<Button type="reset" label="Annuler" onClick={onCancelButtonClick} />
			<Button
				type="submit"
				label="Valider"
				onClick={submitButtonClickHandler}
			/>
		</form>
	);
}

Form.propTypes = {
	isFamilyForm: PropTypes.bool,
	isActive: PropTypes.bool,
	onCancelButtonClick: PropTypes.func,
};
Form.defaultProps = {
	isFamilyForm: false,
	isActive: false,
};

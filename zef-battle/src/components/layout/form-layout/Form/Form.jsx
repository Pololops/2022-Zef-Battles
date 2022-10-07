import PropTypes from 'prop-types';
import { useState } from 'react';

import Input from '../Input/Input';
import Button from '../Button/Button';

export default function Form({ isFamilyForm }) {
	const [nameInputValue, setNameInputValue] = useState('');

	const inputChangeHandler = (event, setState) => setState(event.target.value);
	const cancelButtonClickHandler = (event) => {
		event.preventDefault();
		setNameInputValue('');
	};
	const submitButtonClickHandler = (event) => event.preventDefault();

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
				isFocus={true}
			/>
			<Button
				type="button"
				value="Cancel"
				label="Annuler"
				onClick={cancelButtonClickHandler}
			/>
			<Button
				type="submit"
				value="Submit"
				label="Valider"
				onClick={submitButtonClickHandler}
			/>
		</form>
	);
}

Form.propTypes = {
	isFamilyForm: PropTypes.bool,
	isActive: PropTypes.bool,
	setIsFlipped: PropTypes.func.isRequired,
};
Form.defaultProps = {
	isFamilyForm: false,
	isActive: false,
};

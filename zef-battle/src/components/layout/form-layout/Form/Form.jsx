import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Input from '../Input/Input';

export default function Form({ isFamilyForm, isActive }) {
	const [isFocus, setIsFocus] = useState(false);
	const [nameInputValue, setNameInputValue] = useState('');

	const inputChangeHandler = (event, setState) => setState(event.target.value);

	useEffect(() => {
		setIsFocus(true);
	}, [isActive])

	return (
		<form
			className={`form ${isFamilyForm ? 'form--family' : 'form--character'}`}
		>
			<Input
				type="text"
				name="name"
				value={nameInputValue}
				placeholder={isFamilyForm ? 'Nom de Famille' : 'Nom du personnage'}
				onChange={(event) => inputChangeHandler(event, setNameInputValue)}
				isFocus={isFocus}
			/>
		</form>
	);
}

Form.propTypes = {
	isFamilyForm: PropTypes.bool,
	isActive: PropTypes.bool,
};
Form.defaultProps = {
	isFamilyForm: false,
	isActive: false,
};

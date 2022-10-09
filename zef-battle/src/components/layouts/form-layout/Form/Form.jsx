import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';

import { CardsContext } from '../../../../contexts/cardsContext';

import { getFamilies, postNewFamily } from '../../../../apiClient/apiRequests';

import Input from '../Input/Input';
import Button from '../Button/Button';

export default function Form({ isFamilyForm, formCloser, isActive }) {
	const { setFamilies } = useContext(CardsContext);

	const [nameInputValue, setNameInputValue] = useState('');

	const inputChangeHandler = (event, setState) => setState(event.target.value);
	const submitButtonClickHandler = async (event) => {
		event.preventDefault();
		await postNewFamily({ name: nameInputValue });
		setFamilies(await getFamilies());
		formCloser();
	};

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
			<Button type="reset" label="Annuler" onClick={formCloser} />
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
	formCloser: PropTypes.func,
};
Form.defaultProps = {
	isFamilyForm: false,
	isActive: false,
};

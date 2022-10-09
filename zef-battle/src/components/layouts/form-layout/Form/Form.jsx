import PropTypes from 'prop-types';

import './Form.scss';

import { useState, useEffect, useContext } from 'react';
import { CardsContext } from '../../../../contexts/cardsContext';
import { getFamilies, postNewFamily } from '../../../../apiClient/apiRequests';

import Input from '../Input/Input';
import Button from '../Button/Button';
import Message from '../Message/Message';

const regexpToMatch = /^((?!_)[\w]{1})([\w' \-]*)$/;

export default function Form({ isFamilyForm, formCloser, isActive }) {
	const { setFamilies } = useContext(CardsContext);

	const [nameInputValue, setNameInputValue] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const inputChangeHandler = (event, setState) => {
		const value = event.target.value;
		if (value !== '') {
			if (!value.match(regexpToMatch)) {
				setErrorMessage(
					'Attention : que des lettres, des chiffres, des espaces, des apostrophes ou des tirets !',
				);
			} else {
				setState(value);
				setErrorMessage('');
			}
		}
	};
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
			{errorMessage !== '' && <Message message={errorMessage} />}
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

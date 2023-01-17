import PropTypes from 'prop-types';

import './Form.scss';

import { useState, useEffect, useContext, useCallback } from 'react';
import { CardsContext } from '../../../../contexts/cardsContext';
import {
	postNewFamily,
	postNewCharacter,
} from '../../../../apiClient/apiRequests';

import Input from '../Input/Input';
import Button from '../Button/Button';
import DropZone from '../DropZone/DropZone';
import Message from '../Message/Message';

const regexpToMatch =
	/^([0-9@-Za-zÀ-ÖØ-öø-ÿ-&'_^])([0-9@-Za-zÀ-ÖØ-öø-ÿ-&' _^]*)$/;

export default function Form({ isFamilyForm, familyId, formCloser, isActive }) {
	const { dispatch } = useContext(CardsContext);

	const [nameInputValue, setNameInputValue] = useState('');
	const [droppedFiles, setDroppedFiles] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');

	const inputChangeHandler = (event, setState) => {
		const value = event.target.value;

		if (value === '') return setState('');

		if (!value.match(regexpToMatch)) {
			setErrorMessage('Il est bizarre ce character ici !?!');
		} else {
			setState(value);
			setErrorMessage('');
		}
	};

	const dropzoneHandler = useCallback((acceptedfiles) => {
		setDroppedFiles(
			acceptedfiles.map((files) =>
				Object.assign(files, {
					preview: URL.createObjectURL(files),
				}),
			),
		);
	}, []);

	const submitButtonClickHandler = async (event) => {
		event.preventDefault();

		if (nameInputValue === '')
			return setErrorMessage(`Tu as oublié d'écrire un nom.`);

		if (isFamilyForm) {
			const { statusCode, data } = await postNewFamily({
				body: {
					name: nameInputValue,
				},
			});

			if (statusCode === 200) {
				dispatch({ type: 'CREATE_FAMILY_CARD', payload: data });
			}
		} else {
			const formData = new FormData();
			formData.append('name', nameInputValue);
			formData.append('family_id', familyId);
			formData.append('file', droppedFiles[0]);

			const { statusCode, data } = await postNewCharacter({
				familyId,
				body: formData,
			});

			if (statusCode === 200) {
				dispatch({
					type: 'CREATE_CHARACTER_CARD',
					payload: { ...data, family_id: familyId },
				});
			}
		}

		formCloser();
	};

	useEffect(() => {
		if (isActive) {
			setNameInputValue('');
			setErrorMessage('');
		}

		return () =>
			setTimeout(() => {
				setNameInputValue('');
				setDroppedFiles([]);
			}, 500);
	}, [isActive]);

	return (
		<form
			className={`form ${isFamilyForm ? 'form--family' : 'form--character'}`}
			method="post"
		>
			<Input
				type="text"
				name="name"
				value={nameInputValue}
				placeholder={isFamilyForm ? 'Nom de Famille' : 'Nom du personnage'}
				autoComplete={false}
				onChange={(event) => inputChangeHandler(event, setNameInputValue)}
				isFocus='alwaysFocus'
			/>
			{errorMessage !== '' && <Message message={errorMessage} />}

			{!isFamilyForm && (
				<>
					<Input
						type="hidden"
						name="family_id"
						value={familyId.toString()}
						autoComplete={false}
						isFocus={false}
						readOnly
					/>
					<DropZone droppedFiles={droppedFiles} onDrop={dropzoneHandler} />
				</>
			)}

			<div className="form__buttons">
				<Button type="reset" label="Annuler" onClick={formCloser} />
				<Button
					type="submit"
					label="Valider"
					onClick={submitButtonClickHandler}
				/>
			</div>
		</form>
	);
}

Form.propTypes = {
	isFamilyForm: PropTypes.bool,
	familyId: PropTypes.number.isRequired,
	isActive: PropTypes.bool,
	formCloser: PropTypes.func,
};

Form.defaultProps = {
	isFamilyForm: false,
	isActive: false,
};

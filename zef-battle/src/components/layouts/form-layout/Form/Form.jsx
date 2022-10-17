import PropTypes from 'prop-types';

import './Form.scss';

import { useState, useEffect, useContext, useCallback } from 'react';
import { CardsContext } from '../../../../contexts/cardsContext';
import {
	getFamilies,
	postNewFamily,
	postNewCharacter,
} from '../../../../apiClient/apiRequests';

import Input from '../Input/Input';
import Button from '../Button/Button';
import DropZone from '../DropZone/DropZone';
import Message from '../Message/Message';

const regexpToMatch = /^[0-9@-Za-zÀ-ÖØ-öø-ÿ-& '_^]+$/;

export default function Form({ isFamilyForm, familyId, formCloser, isActive }) {
	const { setFamilies } = useContext(CardsContext);

	const [nameInputValue, setNameInputValue] = useState('');
	const [droppedFiles, setDroppedFiles] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');

	const inputChangeHandler = (event, setState) => {
		const value = event.target.value;

		if (value === '') return setState('');

		if (!value.match(regexpToMatch)) {
			setErrorMessage(
				'Attention : que des lettres, des chiffres, des espaces, des apostrophes ou des tirets !',
			);
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

		if (isFamilyForm) {
			const newFamily = await postNewFamily({ name: nameInputValue });

			setFamilies((previousState) => [
				{ ...newFamily, characters: [] },
				...previousState,
			]);
		} else {
// ! Search how to get url image dropped into input type = file in the form MDN documentation
			console.log(droppedFiles);
			//const newCharacter = await postNewCharacter({
			//	name: nameInputValue,
			//	picture: droppedFiles[0].preview,
			//	family_id: familyId,
			//});
//
			//setFamilies(await getFamilies());
		}

		formCloser();
	};

	useEffect(() => {
		if (isActive) {
			setNameInputValue('');
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

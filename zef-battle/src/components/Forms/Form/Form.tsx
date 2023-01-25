import './Form.scss';

import { useState, useEffect, useCallback, useContext } from 'react';

import { postFamily, postCharacter } from '../../../apiClient/apiRequests';
import { DropZone, Button, Input, Message } from '../../'

import { FileWithPath } from 'react-dropzone';
import { useCards } from '../../App/App'
import { ModalContext } from '../../../contexts/modalContext'

interface Props {
	familyId: number
	isFamilyForm?: boolean
	formCloser: () => void
	isActive?: boolean
}

const regexpToMatch =
	/^([0-9@-Za-zÀ-ÖØ-öø-ÿ-&'_^])([0-9@-Za-zÀ-ÖØ-öø-ÿ-&' _^]*)$/;

export default function Form({ isFamilyForm, familyId, formCloser, isActive }: Props) {
	const { setIsVisible } = useContext(ModalContext)
	const [nameInputValue, setNameInputValue] = useState('');
	const [droppedFiles, setDroppedFiles] = useState([] as FileWithPath[]);
	const [missingValue, setMissingValue] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const { dispatch } = useCards()
	

	const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<string>>) => {
		const value = event.currentTarget.value;

		if (value === '') return setState('');

		if (!value.match(regexpToMatch)) {
			setErrorMessage('Il est bizarre ce character ici !?!');
		} else {
			setState(value);
			setErrorMessage('');
		}
	};

	const dropzoneHandler = useCallback((acceptedfiles: FileWithPreview[]) => {
		setDroppedFiles(acceptedfiles.map((files) => Object.assign(files, {
			preview: URL.createObjectURL(files),
		})));
	}, []);

	const submitHandler: React.FormEventHandler = async (event) => {
		event.preventDefault();

		if (nameInputValue === '') {
			setErrorMessage(`Tu as oublié d'écrire un nom.`)
			return setMissingValue('name')
		}

		if (!isFamilyForm && droppedFiles.length === 0) {
			setErrorMessage(`Tu as oublié de déposer une image.`)
			return setMissingValue('file')
		}

		if (isFamilyForm) {
			const { status, statusCode, data } = await postFamily({ 
				name: nameInputValue 
			});

			if (status !== 'OK' && statusCode === 401) return setIsVisible(true)
			
			dispatch({
				type: 'CREATE_FAMILY_CARD', 
				payload: data 
			});
		} else {
			const { status, statusCode, data } = await postCharacter(familyId, { 
				name: nameInputValue, 
				family_id: familyId, 
				file: droppedFiles[0]
			});

			if (status !== 'OK' && statusCode === 401) return setIsVisible(true)
			if (status !== 'OK' && statusCode === 403) return setErrorMessage(`Tu n'as pas le droit de modifier une famille créée par un autre utilisateur`)
			
			dispatch({
				type: 'CREATE_CHARACTER_CARD',
				payload: data,
			});
		}

		formCloser();
	};

	const unloadAfterDelay = () => {
		setTimeout(() => {
			setNameInputValue('');
			setDroppedFiles([]);
		}, 500);
	}
	useEffect(() => {
		if (isActive) {
			setNameInputValue('');
			setErrorMessage('');
		}

		return () => unloadAfterDelay()
	}, [isActive]);

	return (
		<form
			className={`form ${isFamilyForm ? 'form--family' : 'form--character'}`}
			method="post"
			onSubmit={submitHandler}
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
			{missingValue === 'name' && errorMessage !== '' && <Message message={errorMessage} />}

			{!isFamilyForm && (
				<>
					<Input
						type="hidden"
						name="family_id"
						value={familyId.toString()}
						autoComplete={false}
						readOnly
					/>
					<DropZone droppedFiles={droppedFiles} onDrop={dropzoneHandler} />
					{missingValue === 'file' && errorMessage !== '' && <Message message={errorMessage} />}
				</>
			)}

			<div className="form__buttons">
				<Button type="reset" label="Annuler" onClick={formCloser} />
				<Button
					type="submit"
					label="Valider"
					onClick={submitHandler}
				/>
			</div>
		</form>
	);
}

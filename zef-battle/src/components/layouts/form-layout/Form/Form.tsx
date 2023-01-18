import './Form.scss';

import { 
	useState, 
	useEffect, 
	useContext, 
	useCallback, 
	SetStateAction, 
	ChangeEvent, 
	Dispatch, 
} from 'react';
import { CardsContext } from '../../../../contexts/cardsContext';
import {
	postFamily,
	postCharacter,
} from '../../../../apiClient/apiRequests';

import Input from '../Input/Input';
import Button from '../Button/Button';
import DropZone from '../DropZone/DropZone';
import Message from '../Message/Message';
import { FileWithPath } from 'react-dropzone';
import { FormEventHandler } from 'react';

interface FileWithPreview extends File {
  readonly preview?: string;
}

interface Props {
	familyId: number,
	isFamilyForm?: boolean,
	formCloser: () => SetStateAction<boolean>,
	isActive?: boolean
}

const regexpToMatch =
	/^([0-9@-Za-zÀ-ÖØ-öø-ÿ-&'_^])([0-9@-Za-zÀ-ÖØ-öø-ÿ-&' _^]*)$/;

export default function Form({ isFamilyForm, familyId, formCloser, isActive }: Props) {
	const { dispatch } = useContext(CardsContext);

	const [nameInputValue, setNameInputValue] = useState('');
	const [droppedFiles, setDroppedFiles] = useState([] as FileWithPath[]);
	const [missingValue, setMissingValue] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	

	const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>, setState: Dispatch<SetStateAction<string>>) => {
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

	const submitHandler: FormEventHandler = async (event) => {
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
			const { status, data } = await postFamily({
				name: nameInputValue,
			});

			if (status === 'OK') {
				dispatch({ type: 'CREATE_FAMILY_CARD', payload: data });
			}
		} else {
			const formData = new FormData();
			formData.append('name', nameInputValue);
			formData.append('family_id', familyId.toString());
			formData.append('file', droppedFiles[0]);

			const { status, data } = await postCharacter(familyId, formData);

			if (status === 'OK') {
				dispatch({
					type: 'CREATE_CHARACTER_CARD',
					payload: data,
				});

				formCloser();
			}
		}
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

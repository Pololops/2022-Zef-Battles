import { useCallback, useContext, useEffect, useState } from 'react'
import { MessageContext, MESSAGE } from '../../../../contexts/MessageContext'
import { ModalContext } from '../../../../contexts/ModalContext'
import { useCards } from '../../../App/App'
import { postCharacter, postFamily } from '../../../../apiClient/apiRequests'
import { Button, DropZone, Form, Input, Message } from '../../..'

import type { FileWithPath } from 'react-dropzone'

interface Props {
	isFamilyCard?: boolean
	familyId: number
	isActive?: boolean
	formCloser: () => void
}

const regexpToMatch =
	/^([0-9@-Za-zÀ-ÖØ-öø-ÿ-&'_^])([0-9@-Za-zÀ-ÖØ-öø-ÿ-&' _^]*)$/;

export default function AddCardFrontFace({
	isFamilyCard = false,
	familyId,
	isActive = false,
	formCloser,
}: Props) {
	const { messageContent, setMessageContent, messageToDisplay, setMessageToDisplay } = useContext(MessageContext)
	const { setIsModalVisible } = useContext(ModalContext)
	
	const [nameInputValue, setNameInputValue] = useState('');
	const [droppedFiles, setDroppedFiles] = useState([] as FileWithPath[]);
	const [missingValue, setMissingValue] = useState('');
	const { dispatch } = useCards()

	const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<string>>) => {
		const value = event.currentTarget.value;

		if (value === '') return setState('');

		if (!value.match(regexpToMatch)) {
			setMessageToDisplay(MESSAGE.CARD)
			setMessageContent('Il est bizarre ce character ici !?!');
		} else {
			setState(value);
			setMessageToDisplay(MESSAGE.NONE)
			setMessageContent('');
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
			setMessageToDisplay(MESSAGE.CARD)
			setMessageContent(`Tu as oublié d'écrire un nom.`)
			return setMissingValue('name')
		}

		if (!isFamilyCard && droppedFiles.length === 0) {
			setMessageToDisplay(MESSAGE.CARD)
			setMessageContent(`Tu as oublié de déposer une image.`)
			return setMissingValue('file')
		}

		if (isFamilyCard) {
			const { status, statusCode, data } = await postFamily({ 
				name: nameInputValue 
			});

			if (status !== 'OK' && statusCode === 401) {
				setIsModalVisible(true)
				setMessageToDisplay(MESSAGE.MODAL)
				return setMessageContent('Connecte-toi pour ajouter, modifier ou supprimer des cartes')
			}
			
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

			if (status !== 'OK' && statusCode === 401) {
				setIsModalVisible(true)
				setMessageToDisplay(MESSAGE.MODAL)
				return setMessageContent('Connecte-toi pour ajouter, modifier ou supprimer des cartes')
			}

			if (status !== 'OK' && statusCode === 403) {
				setMessageToDisplay(MESSAGE.CARD)
				return setMessageContent(`Tu n'as pas le droit de modifier une famille créée par un autre utilisateur`)
			}
			
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
			setMessageToDisplay(MESSAGE.NONE)
			setMessageContent('');
		}

		return () => unloadAfterDelay()
	}, [isActive]);

	return (
		<div className="card__inner__face card__inner__face--front">
			<div
				className="card__inner__face__close"
				onClick={formCloser}
			></div>
			<Form
				className={`form ${isFamilyCard ? 'form--family' : 'form--character'}`}
				name='add-card'
				onSubmit={submitHandler}
			>
				<Input
					type="text"
					name="name"
					value={nameInputValue}
					placeholder={isFamilyCard ? 'Nom de Famille' : 'Nom du personnage'}
					autoComplete={false}
					onChange={(event) => inputChangeHandler(event, setNameInputValue)}
					isFocus={isActive}
				/>
				{messageContent !== '' && messageToDisplay === MESSAGE.CARD && missingValue === 'name' && <Message />}

				{!isFamilyCard && (
					<>
						<Input
							type="hidden"
							name="family_id"
							value={familyId.toString()}
							autoComplete={false}
							readOnly
						/>
						<DropZone droppedFiles={droppedFiles} onDrop={dropzoneHandler} />
						{messageContent !== '' && messageToDisplay === MESSAGE.CARD && missingValue === 'file' && <Message />}
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
			</Form>
		</div>
	)
}

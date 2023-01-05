import { useContext } from 'react'
import { ModalContext } from '../../../../contexts/modalContext'

import Button from '../../form-layout/Button/Button'
import Input from '../../form-layout/Input/Input'

export default function ModalLog() {
	const { setIsVisible } = useContext(ModalContext)
	return (
		<div className="modal">
			<Button type="cancel" label="Fermer" onClick={() => setIsVisible(false)} />
		</div>
	)
}

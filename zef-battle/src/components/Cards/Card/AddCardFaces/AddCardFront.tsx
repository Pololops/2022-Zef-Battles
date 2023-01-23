import Form from '../../../Forms/Form/Form'

interface Props {
	isFamilyCard?: boolean
	familyId: number
	isActive?: boolean
	formCloser: () => void
}

export default function AddCardFrontFace({
	isFamilyCard = false,
	familyId,
	isActive = false,
	formCloser,
}: Props) {
	return (
		<div className="card__inner__face card__inner__face--front">
			<div
				className="card__inner__face__close"
				onClick={formCloser}
			></div>
			<Form
				isFamilyForm={isFamilyCard}
				familyId={familyId}
				isActive={isActive}
				formCloser={formCloser}
			/>
		</div>
	)
}

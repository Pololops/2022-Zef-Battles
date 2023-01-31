import './Card.scss'

import { CardBackFace } from '../../'


interface Props  {
	id: number
	index: number
	title: string
	imageUrl: string
	totalCards: number
	startEffect: boolean
}

export default function HomeCard({
	id,
	index,
	title,
	imageUrl,
	totalCards,
	startEffect
}: Props) {
	const cardIndex = index + 0.5
	const degreeRotation = (((totalCards/2) * (-1)) + cardIndex) * 15
	const marginLeft = (((totalCards/2) * (-1)) + cardIndex) * 60
	const marginTop = ((cardIndex - (totalCards - cardIndex)) * ((cardIndex - totalCards/2))) / totalCards

	const cardsOutStyle = {
		transform: `rotate(0deg)`,
		marginLeft: `0px`,
		marginTop: `0px`,
	}
	
	const cardsOverStyle = {
		transform: `rotate(${degreeRotation}deg)`,
		marginLeft: `${marginLeft}px`,
		marginTop: `${marginTop}em`,
	}

	return (
		<div 
			className='card'
			style={startEffect ? cardsOverStyle : cardsOutStyle}
		>
			<div className="card__inner">
				<CardBackFace
					id={ id }
					title={ title }
					imageUrl={ imageUrl }
				/>
			</div>
		</div>
	)
}

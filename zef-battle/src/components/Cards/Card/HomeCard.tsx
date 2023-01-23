import { useState } from 'react'
import './Card.scss'

import CardBackFace from './CardFaces/CardBack'

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
	const degreeRotation = (((totalCards/2) * (-1)) + index + 0.5) * 15
	const marginLeft = (((totalCards/2) * (-1)) + (index + 0.5)) * 60
	const cardsOutStyle = {
		transform: `rotate(0deg)`,
		marginLeft: `0px`,
	}
	const cardsOverStyle = {
		transform: `rotate(${degreeRotation}deg)`,
		marginLeft: `${marginLeft}px`,
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

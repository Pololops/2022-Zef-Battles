import { useState, useEffect } from 'react';
import { useLoaderData } from "react-router-dom";
import RandomCard from '../../Cards/Card/HomeCard'

import './HomePage.scss'

export default function HomePage() {
	const { randomCards: { data } } = useLoaderData() as { randomCards: { data: Character[] | string } }
	const [startEffect, setStartEffect] = useState(false)


	useEffect(() => {
		const timeout = setTimeout(() => {
			setStartEffect(true)
		}, 500);

		return () => clearTimeout(timeout)
	}, [])

	return (
		<>
			{ typeof data !== 'string'
				? (
						<div 
							className="cards home-cards"
						>
							{data.map((card, index) =>
								card && (
									<RandomCard
										key={card.id + card.name}
										id={card.id}
										index={index}
										title={card.name}
										imageUrl={card.picture}
										totalCards={data.length}
										startEffect={startEffect}
									/>
								),
							)}
						</div>
					)
				: data 
			}
		</>
	)
}

import { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useCards } from '../../App/App'

import Cards from '../../Cards/Cards'
import Card from '../../Cards/Card/Card'

export default function FamiliesPage() {
	const { cards } = useCards()
	const { id } = useParams()

	const [characterCards, setCharacterCards] = useState([] as Character[])
	const [familyName, setFamilyName] = useState('')
	const [familyId, setFamilyId] = useState(undefined as number | undefined)
	const [isFamily, setIsFamily] = useState(false)

	const getFamilyCharacters = useMemo(
		() => () => {
			const familyId = id && parseInt(id)
			const findFamily = cards.find((family) => family.id === familyId)

			if (findFamily) {
				setFamilyName(findFamily.name)
				setFamilyId(findFamily.id)
				setCharacterCards(findFamily.characters)
			}
		},
		[cards, id],
	)

	useEffect(() => {
		if (id) {
			getFamilyCharacters()
			setIsFamily(true)
		} else {
			setIsFamily(false)
		}
	}, [cards, getFamilyCharacters, id])

	return (
		<>
			<h2>{ isFamily ? `La famille ${familyName}` : 'Les Familles' }</h2>
	 		{/* isLoading && <p>...chargement en cours...</p> */}
			{/* errorMessage !== '' && <p>`${errorMessage}`</p> */}

			<div className="cards">
				<Card
					key={isFamily ? 'addNewCharacter' : 'addNewFamily'}
					index={0}
					isManageCard={true}
					isFamilyCard={!isFamily}
					familyName={familyName}
					familyId={familyId}
				/>

				{isFamily ? (
					characterCards.length > 0 
					?	<Cards
							data={ characterCards }
							isFamilyCard={ false } 
						/>
					: <Card
							key="removeFamily"
							index={1}
							isManageCard={true}
							isRemoveFamilyCard={true}
							isFamilyCard={true}
							familyName={familyName}
							familyId={familyId}
						/>
				) : (
					cards && (
						<Cards
							data={cards}
							isFamilyCard={true}
						/>
					)
				)}
			</div>
		</>
	);
}

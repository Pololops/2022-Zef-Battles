export const enum ACTION_TYPES {
	GET_CARDS = 'GET_CARDS',
  CREATE_FAMILY_CARD = 'CREATE_FAMILY_CARD',
  DELETE_FAMILY_CARD = 'DELETE_FAMILY_CARD',
  CREATE_CHARACTER_CARD = 'CREATE_CHARACTER_CARD',
  DELETE_CHARACTER_CARD = 'DELETE_CHARACTER_CARD',
	CREATE_CHARACTER_CAPACITY = 'CREATE_CHARACTER_CAPACITY',
	DELETE_CHARACTER_CAPACITY = 'DELETE_CHARACTER_CAPACITY',
}

export type Action = {
  type: ACTION_TYPES;
  payload: any;
}

export const cardsReducer = (state: Family[], { type, payload }: Action): Family[] => {
	switch (type) {
		case ACTION_TYPES.GET_CARDS:
			return [...payload]

		case ACTION_TYPES.CREATE_FAMILY_CARD: {
			const { id } = payload
			const modifiedState = [...state]

			const foundFamily = findFamily(modifiedState, id)

			if (!foundFamily) {
				modifiedState.unshift({ ...payload, characters: [] })
			}

			return modifiedState
		}

		case ACTION_TYPES.DELETE_FAMILY_CARD: {
			const { family_id } = payload
			const modifiedState = [...state].filter(
				(family) => family.id !== family_id,
			)

			return modifiedState
		}

		case ACTION_TYPES.CREATE_CHARACTER_CARD: {
			const { id, family_id } = payload
			const modifiedState = [...state]

			const familyTarget = findFamily(modifiedState, family_id)

			if (familyTarget) {
				const foundCharacter = findCharacter(familyTarget, id)

				if (!foundCharacter) {
					familyTarget.characters.unshift({ ...payload, capacity: [] })
				}
			}

			return modifiedState
		}

		case ACTION_TYPES.DELETE_CHARACTER_CARD: {
			const { family_id, character_id } = payload
			const modifiedState = [...state]

			const familyTarget = findFamily(modifiedState, family_id)
			
			if (familyTarget) {
				const characterToDeleteIndex = familyTarget.characters.findIndex(
					(character) => character.id === character_id,
				)

				if (characterToDeleteIndex !== -1) {
					familyTarget.characters.splice(characterToDeleteIndex, 1)
				}
			}

			return modifiedState
		}

		case ACTION_TYPES.CREATE_CHARACTER_CAPACITY: {
			const { id, family_id, newCapacityName, capacity } = payload
			const modifiedState = [...state]

			const familyTarget = findFamily(modifiedState, family_id)

			if (familyTarget) {
				const characterTarget = findCharacter(familyTarget, id)

				if (characterTarget) {
					const newCapacity = capacity.find(
						(capacity: Capacity) => capacity.name === newCapacityName,
					)

					const foundCapacity = characterTarget.capacity.find(
						(capacity) => capacity.name === newCapacity.name,
					)

					if (!foundCapacity) {
						characterTarget.capacity.push(newCapacity)
					}
				}
			}

			return modifiedState
		}

		case ACTION_TYPES.DELETE_CHARACTER_CAPACITY: {
			const { family_id, character_id, capacity_id } = payload
			const modifiedState = [...state]

			const familyTarget = findFamily(modifiedState, family_id)

			if (familyTarget) {
				const characterTarget = findCharacter(familyTarget, character_id)

				if (characterTarget) {
					const capacityToRemoveIndex = characterTarget.capacity.findIndex(
						(capacity) => capacity.id === capacity_id,
					)

					if (capacityToRemoveIndex >= 0) {
						characterTarget.capacity.splice(capacityToRemoveIndex, 1)
					}
				}
			}

			return modifiedState
		}

		default:
			return state
	}
}

const findFamily = <T extends Family>(state: T[], familyId: number): T | undefined => {
	return state.find(({ id }) => id === familyId)
}

const findCharacter = (family: Family, characterId: number): Character | undefined => {
	return family.characters.find(({ id }) => id === characterId)
}

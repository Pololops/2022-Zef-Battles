import type { Family } from '../components/App/App'

enum ActionType {
	GET_CARDS = 'GET_CARDS',
  CREATE_FAMILY_CARD = 'CREATE_FAMILY_CARD',
  DELETE_FAMILY_CARD = 'DELETE_FAMILY_CARD',
  CREATE_CHARACTER_CARD = 'CREATE_CHARACTER_CARD',
  DELETE_CHARACTER_CARD = 'DELETE_CHARACTER_CARD',
	CREATE_CHARACTER_CAPACITY = 'CREATE_CHARACTER_CAPACITY',
	DELETE_CHARACTER_CAPACITY = 'DELETE_CHARACTER_CAPACITY',
}

interface Action {
  type: ActionType;
  payload: any;
}

const reducer = (state: Family[], { type, payload }: Action) => {
	switch (type) {
		case 'GET_CARDS':
			return [...payload]

		case ActionType.CREATE_FAMILY_CARD: {
			const { id } = payload
			const modifiedState = [...state]

			const foundFamily = findFamily(modifiedState, id)

			if (!foundFamily) {
				modifiedState.unshift({ ...payload, characters: [] })
			}

			return modifiedState
		}

		case ActionType.DELETE_FAMILY_CARD: {
			const { family_id } = payload
			const modifiedState = [...state].filter(
				(family) => family.id !== family_id,
			)

			return modifiedState
		}

		case ActionType.CREATE_CHARACTER_CARD: {
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

		case ActionType.DELETE_CHARACTER_CARD: {
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

		case ActionType.CREATE_CHARACTER_CAPACITY: {
			const { id, family_id, newCapacityName, capacity } = payload
			const modifiedState = [...state]

			const familyTarget = findFamily(modifiedState, family_id)

			if (familyTarget) {
				const characterTarget = findCharacter(familyTarget, id)

				if (characterTarget) {
					const newCapacity = capacity.find(
						(capacity : {name: string}) => capacity.name === newCapacityName,
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

		case ActionType.DELETE_CHARACTER_CAPACITY: {
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

const findFamily = <T extends Family>(state: T[], familyId: number) => {
	return state.find((family) => family.id === familyId)
}

const findCharacter = <T extends Family>(family: T, characterId: number) => {
	return family.characters.find((character) => character.id === characterId)
}

export default reducer;

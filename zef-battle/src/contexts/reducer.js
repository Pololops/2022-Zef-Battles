const reducer = (state, { type, payload }) => {
	switch (type) {
		case 'GET_CARDS':
			return [...payload];

		case 'CREATE_FAMILY_CARD': {
			const modifiedState = [...state];

			const foundFamilyId = modifiedState.find(({ id }) => id === payload.id);

			if (!foundFamilyId) {
				modifiedState.unshift({ ...payload, characters: [] });
			}

			return [...modifiedState];
		}

		case 'DELETE_FAMILY_CARD': {
			const modifiedState = [...state].filter(
				({ id }) => id !== payload.family_id,
			);

			return [...modifiedState];
		}

		case 'CREATE_CHARACTER_CARD': {
			const modifiedState = [...state];

			const familyTarget = modifiedState.find(
				({ id }) => id === payload.family_id,
			).characters;

			const foundCharacterId = familyTarget.find(({ id }) => id === payload.id);

			if (familyTarget && !foundCharacterId) {
				familyTarget.unshift({ ...payload, capacity: [] });
			}

			return [...modifiedState];
		}

		case 'DELETE_CHARACTER_CARD': {
			const modifiedState = [...state];

			const familyTarget = modifiedState.find(
				(family) => family.id === payload.family_id,
			).characters;

			const characterToDeleteIndex = familyTarget.findIndex(
				(character) => character.id === payload.character_id,
			);

			if (characterToDeleteIndex >= 0) {
				modifiedState
					.find(({ id }) => id === payload.family_id)
					.characters.splice(characterToDeleteIndex, 1);
			}

			return [...modifiedState];
		}

		case 'CREATE_CHARACTER_CAPACITY': {
			const modifiedState = [...state];

			const characterTargetCapacities = modifiedState
				.find((family) => family.id === payload.family_id)
				.characters.find((character) => character.id === payload.id).capacity;

			const newCapacity = payload.capacity.find(
				({ name }) => name === payload.newCapacityName,
			);

			const foundCapacity = characterTargetCapacities.find(
				({ name }) => name === newCapacity.name,
			);

			if (characterTargetCapacities && !foundCapacity) {
				characterTargetCapacities.push(newCapacity);
			}

			return [...modifiedState];
		}

		case 'DELETE_CHARACTER_CAPACITY': {
			const modifiedState = [...state];

			const characterTargetCapacities = modifiedState
				.find((family) => family.id === payload.family_id)
				.characters.find(
					(character) => character.id === payload.character_id,
				).capacity;

			const capacityToRemoveIndex = characterTargetCapacities.findIndex(
				({ id }) => id === payload.capacity_id,
			);

			if (capacityToRemoveIndex >= 0) {
				characterTargetCapacities.splice(capacityToRemoveIndex, 1);
			}

			return [...modifiedState];
		}

		default:
			return state;
	}
};

export default reducer;

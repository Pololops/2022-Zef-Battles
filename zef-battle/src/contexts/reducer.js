const reducer = (state, { type, payload }) => {
	switch (type) {
		case 'GET_CARDS':
			return [...payload];

		case 'CREATE_FAMILY_CARD': {
			return [
				{
					...payload,
					characters: [],
				},
				...state,
			];
		}

		case 'CREATE_CHARACTER_CARD': {
      const familyTarget = [...state].find(({ id }) => id === payload.family_id);
      familyTarget.characters.unshift(payload);

			return [
        ...state,
        ...familyTarget,
      ];
		}

		case 'DELETE_CHARACTER_CARD': {
			console.log('Input State : ', payload);
			const modifiedState = [...state];

			const characterToDeleteIndex = modifiedState
				.find((family) => family.id === payload.family_id)
				.characters.findIndex(
					(character) => character.id === payload.character_id,
				);

			modifiedState
				.find(({ id }) => id === payload.family_id)
				.characters.splice(characterToDeleteIndex, 1);

			return [...modifiedState];
		}

		case 'CREATE_CAPACITY': {
			const modifiedState = [...state];
			modifiedState
				.find((family) => family.id === payload.family_id)
				.characters.find((character) => character.id === payload.character_id)
				.capacity.push({
					id: payload.id,
					name: payload.name,
					level: payload.level ?? 0,
					description: payload.description ?? '',
				});

			return [...modifiedState];
		}

		default:
			return state;
	}
};

export default reducer;

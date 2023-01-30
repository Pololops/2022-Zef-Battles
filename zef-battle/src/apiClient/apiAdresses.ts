const baseApiUrl = process.env.REACT_APP_API_BASE_URL + '/api';

// User URL
export const userUrl = (userId?: number): string => {
	if (userId) {
		return `${baseApiUrl}/user/${userId}`;
	}
	return`${baseApiUrl}/user`;
}

export const loginUrl = () => {
	return `${baseApiUrl}/user/login`;
}

// Families URL
export const familyUrl = (arg?: boolean | number): string => {
	if (arg) {
		if (typeof arg === 'number') {
			return `${baseApiUrl}/family/${arg}`;
		} else {
			return `${baseApiUrl}/family?withcharacters=${arg}`;
		}
	}
	return `${baseApiUrl}/family`;
}

// Characters URL
export const randomCharacterURL = (quantity: number): string => {
	return `${baseApiUrl}/character?quantity=${quantity}`;
}

export const characterInFamilyUrl = (familyId: number): string => {
	return `${baseApiUrl}/family/${familyId}/character`;
}

export const characterUrl = (characterId: number): string => {
	if (characterId) {
		return `${baseApiUrl}/character/${characterId}`;
	}
	return`${baseApiUrl}/character`;
}

// Capacities URL
export const capacityUrl = (capacityId: number): string => {
	if (capacityId) {
		return `${baseApiUrl}/capacity/${capacityId}`;
	}
	return `${baseApiUrl}/capacity`;
}

export const characterCapacityUrl = (characterId: number, capacityId?: number): string => {
	if (capacityId) {
		return `${baseApiUrl}/character/${characterId}/capacity/${capacityId}`;
	}
	return `${baseApiUrl}/character/${characterId}/capacity`;
}

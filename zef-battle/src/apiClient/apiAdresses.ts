const baseApiUrl = process.env.REACT_APP_API_BASE_URL + '/api';

export const familyUrl = (withcharacters?: boolean): string =>
	`${baseApiUrl}/family?withcharacters=${withcharacters}`;

export const characterInFamilyUrl = (familyId: number): string =>
	`${baseApiUrl}/family/${familyId}/character`;

export const characterUrl = (characterId: number): string =>
	characterId
		? `${baseApiUrl}/character/${characterId}`
		: `${baseApiUrl}/character`;

export const capacityUrl = (capacityId: number): string =>
	capacityId
		? `${baseApiUrl}/capacity/${capacityId}`
		: `${baseApiUrl}/capacity`;

export const characterCapacityUrl = (characterId: number, capacityId?: number): string =>
	capacityId
		? `${baseApiUrl}/character/${characterId}/capacity/${capacityId}`
		: `${baseApiUrl}/character/${characterId}/capacity`;

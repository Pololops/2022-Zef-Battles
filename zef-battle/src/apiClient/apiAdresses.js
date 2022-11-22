const baseApiUrl = process.env.REACT_APP_API_BASE_URL + '/api';

export const familyUrl = (withcharacters) =>
	`${baseApiUrl}/family?withcharacters=${withcharacters}`;

export const characterInFamilyUrl = (familyId) =>
	`${baseApiUrl}/family/${familyId}/character`;

export const characterUrl = (characterId) => 
	characterId
		? `${baseApiUrl}/character/${characterId}`
		: `${baseApiUrl}/character`;

export const capacityUrl = (capacityId) =>
	capacityId
		? `${baseApiUrl}/capacity/${capacityId}`
		: `${baseApiUrl}/capacity`;

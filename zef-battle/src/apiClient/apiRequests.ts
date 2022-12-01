import fetchAPI from './apiFetcher';

import {
	familyUrl,
	characterInFamilyUrl,
	characterUrl,
	characterCapacityUrl,
} from './apiAdresses';


type Arg = {
	[key: string]: number,
} & { body?: BodyInit };

export const getFamilies = async (withCharacters: boolean) => await fetchAPI(familyUrl(withCharacters));

export const postNewFamily = async ({body}: Arg) =>
	await fetchAPI(familyUrl(), 'POST', body);

export const deleteFamily = async ({familyId}: Arg) => {
	return await fetchAPI(familyUrl(familyId), 'DELETE');
};

export const postNewCharacter = async ({familyId, body}: Arg) => {
	return await fetchAPI(
		characterInFamilyUrl(familyId),
		'POST',
		body,
		'formData',
	);
};

export const deleteCharacter = async ({characterId}: Arg) => {
	return await fetchAPI(characterUrl(characterId), 'DELETE');
};

export const addCharacterCapacity = async ({characterId, body}: Arg) => {
	return await fetchAPI(characterCapacityUrl(characterId), 'POST', body);
};

export const removeCharacterCapacity = async ({characterId, capacityId}: Arg) => {
	return await fetchAPI(
		characterCapacityUrl(characterId, capacityId),
		'DELETE',
	);
};

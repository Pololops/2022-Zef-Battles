import fetchAPI from './apiFetcher';
import {
	familyUrl,
	characterInFamilyUrl,
	characterUrl,
	characterCapacityUrl,
} from './apiAdresses';

export const getFamilies = async (data) => await fetchAPI(familyUrl(data));

export const postNewFamily = async ({body}) =>
	await fetchAPI(familyUrl(), 'POST', body);

export const postNewCharacter = async ({familyId, body}) => {
	return await fetchAPI(
		characterInFamilyUrl(familyId),
		'POST',
		body,
		'formData',
	);
};

export const deleteCharacter = async ({id}) => {
	return await fetchAPI(characterUrl(id), 'DELETE');
};

export const addCharacterCapacity = async (characterId, data) => {
	return await fetchAPI(characterCapacityUrl(characterId), 'POST', data);
};

export const removeCharacterCapacity = async (data) => {
	return await fetchAPI(
		characterCapacityUrl(data.characterId, data.capacityId),
		'DELETE',
	);
};

import fetchAPI from './apiFetcher';
import {
	familyUrl,
	characterInFamilyUrl,
	characterUrl,
	capacityUrl,
	characterCapacityUrl,
} from './apiAdresses';

export const getFamilies = async (data) => await fetchAPI(familyUrl(data));

export const postNewFamily = async (data) =>
	await fetchAPI(familyUrl(), 'POST', data);

export const postNewCharacter = async (data) => {
	return await fetchAPI(
		characterInFamilyUrl(data.familyId),
		'POST',
		data.body,
		'formData',
	);
};

export const deleteCharacter = async (data) => {
	return await fetchAPI(characterUrl(data.id), 'DELETE');
};

export const postCharacterCapacity = async (data) => {
	return await fetchAPI(capacityUrl(), 'POST', data);
	// return await fetchAPI(characterCapacityUrl(data.id), 'POST', data);
};

export const deleteCharacterCapacity = async (data) => {
	return await fetchAPI(capacityUrl(data.id), 'DELETE');
	// return await fetchAPI(characterCapacityUrl(data.id), 'DELETE');
};

import fetchAPI from './apiFetcher';
import { familyUrl, characterUrl } from './apiAdresses';

export const getFamilies = async (withcharacters) =>
	await fetchAPI(familyUrl(withcharacters));

export const postNewFamily = async (newFamilyData) =>
	await fetchAPI(familyUrl(), 'POST', { ...newFamilyData });

export const postNewCharacter = async (newCharacterData) =>
	await fetchAPI(characterUrl(newCharacterData.family_id), 'POST', {
		...newCharacterData,
	});

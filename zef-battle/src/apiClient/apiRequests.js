import fetchAPI from './apiFetcher';
import { familyUrl, characterUrl } from './apiAdresses';

export const getFamilies = async () =>
	await fetchAPI(familyUrl(), { method: 'GET' });

export const postNewFamily = async (newFamilyData) =>
	await fetchAPI(familyUrl(), { method: 'POST' }, { ...newFamilyData });

export const postNewCharacter = async (newCharacterData) =>
	await fetchAPI(characterUrl(), { method: 'POST' }, { ...newCharacterData });

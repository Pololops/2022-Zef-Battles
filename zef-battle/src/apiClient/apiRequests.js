import fetchAPI from './apiFetcher';
import { familyUrl, characterUrl } from './apiAdresses';

export const getFamilies = async () =>
	await fetchAPI(familyUrl());

export const postNewFamily = async (newFamilyData) =>
	await fetchAPI(familyUrl(), 'POST', { ...newFamilyData });

export const postNewCharacter = async (newCharacterData) =>
	await fetchAPI(characterUrl(), 'POST', { ...newCharacterData });

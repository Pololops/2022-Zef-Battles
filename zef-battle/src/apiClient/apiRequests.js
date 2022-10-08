import fetchAPI from './apiFetcher';
import { familyUrl } from './apiAdresses';

export const getFamilies = async () =>
	await fetchAPI(familyUrl, { method: 'GET' });

export const postNewFamily = async (newFamilyName) =>
	await fetchAPI(familyUrl, { method: 'POST' }, { name: newFamilyName });

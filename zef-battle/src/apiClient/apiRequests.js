import getData from './apiFetcher';
import { familyUrl } from './apiAdresses';

export const getFamilies = async () => await getData(familyUrl, { method: 'GET' });
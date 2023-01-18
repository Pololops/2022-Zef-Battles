import RequestAPI from './apiFetcher';

import {
	loginUrl,
	familyUrl,
	characterInFamilyUrl,
	characterUrl,
	characterCapacityUrl,
} from './apiAdresses';

export type ReturnType = {
	status: string
	statusCode: number,
	data: {} | [] | string
}

type FamilyCreateBodyType = {
	name: string
}

type CapacityCreateBodyType = {
	name: string
	level: number
}

type LoginBodyType = {
	login: string, 
	password: string
}

export const getFamilies = async (withCharacters: boolean): Promise<ReturnType> => {
	return await new RequestAPI({
		url: familyUrl(withCharacters)
	}).fetch()
}

export const postNewFamily = async (body: FamilyCreateBodyType): Promise<ReturnType> => {
	return await new RequestAPI({
		url: familyUrl(), 
		method: 'POST', 
		body,
	}).fetch();
}

export const deleteFamily = async (familyId: number): Promise<ReturnType> => {
	return await new RequestAPI({
		url: familyUrl(familyId), 
		method: 'DELETE'
	}).fetch();
}

export const postNewCharacter = async (familyId: number, body: FormData): Promise<ReturnType> => {
	return await new RequestAPI({
		url: characterInFamilyUrl(familyId),
		method: 'POST',
		body,
		hasFormdata: true,
	}).fetch();
}

export const deleteCharacter = async (characterId: number): Promise<ReturnType> => {
	return await new RequestAPI({ 
		url: characterUrl(characterId), 
		method: 'DELETE'
	}).fetch();
}

export const addCharacterCapacity = async (characterId: number, body: CapacityCreateBodyType): Promise<ReturnType> => {
	return await new RequestAPI({ 
		url: characterCapacityUrl(characterId), 
		method: 'POST', 
		body,
	}).fetch();
}

export const removeCharacterCapacity = async (characterId: number, capacityId: number): Promise<ReturnType> => {
	return await new RequestAPI({
		url: characterCapacityUrl(characterId, capacityId),
		method: 'DELETE',
	}).fetch();
}

export const login = async (body: LoginBodyType) => {
	return await new RequestAPI({
		url: loginUrl(),
		method: 'POST',
		body,
	}).fetch();
}

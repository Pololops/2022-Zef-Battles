import RequestAPI from './apiFetcher';
import {
	loginUrl,
	familyUrl,
	characterInFamilyUrl,
	characterUrl,
	characterCapacityUrl,
} from './apiAdresses';

import type { FileWithPath } from 'react-dropzone'
import { randomCharacterURL } from './apiAdresses';

export type ReturnType<T> = {
	status: string
	statusCode: number,
	data: T
}

type FamilyCreateBodyType = {
	name: string
}

type CharacterCreateBodyType = {
	name: string,
	family_id: number,
	file: FileWithPath
}

type CapacityCreateBodyType = {
	name: string
	level: number
}

type LoginBodyType = {
	login: string, 
	password: string
}

export const getFamilies = async (withCharacters: boolean): Promise<ReturnType<Family[]>> => {
	return await new RequestAPI({
		url: familyUrl(withCharacters)
	}).fetch()
}

export const postFamily = async (body: FamilyCreateBodyType): Promise<ReturnType<Family>> => {
	return await new RequestAPI({
		url: familyUrl(), 
		method: 'POST', 
		body,
	}).fetch();
}

export const deleteFamily = async (familyId: number): Promise<ReturnType<undefined>> => {
	return await new RequestAPI({
		url: familyUrl(familyId), 
		method: 'DELETE'
	}).fetch();
}

export const getRandomCharacters = async (quantity?: number): Promise<ReturnType<Character[]>> => {
	return await new RequestAPI({
		url: randomCharacterURL(quantity || 1)
	}).fetch()
}

export const postCharacter = async (familyId: number, body: CharacterCreateBodyType): Promise<ReturnType<Character>> => {
	const formData = new FormData();
	formData.append('name', body.name);
	formData.append('family_id', body.family_id.toString());
	formData.append('file', body.file);
	
	return await new RequestAPI({
		url: characterInFamilyUrl(familyId),
		method: 'POST',
		body: formData,
		hasFormdata: true,
	}).fetch();
}

export const deleteCharacter = async (characterId: number): Promise<ReturnType<undefined>> => {
	return await new RequestAPI({ 
		url: characterUrl(characterId), 
		method: 'DELETE'
	}).fetch();
}

export const addCharacterCapacity = async (characterId: number, body: CapacityCreateBodyType): Promise<ReturnType<Character>> => {
	return await new RequestAPI({ 
		url: characterCapacityUrl(characterId), 
		method: 'POST', 
		body,
	}).fetch();
}

export const removeCharacterCapacity = async (characterId: number, capacityId: number): Promise<ReturnType<Character>> => {
	return await new RequestAPI({
		url: characterCapacityUrl(characterId, capacityId),
		method: 'DELETE',
	}).fetch();
}

export const login = async (body: LoginBodyType): Promise<ReturnType<Login>> => {
	return await new RequestAPI({
		url: loginUrl(),
		method: 'POST',
		body,
	}).fetch();
}

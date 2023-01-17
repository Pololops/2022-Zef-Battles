import fetchAPI from './apiFetcher';

import {
	loginUrl,
	familyUrl,
	characterInFamilyUrl,
	characterUrl,
	characterCapacityUrl,
} from './apiAdresses';

type APIRequestWithIdType<ReturnT> = (id: number) => Promise<FetchReturnType<ReturnT>>
type APIRequestWithBodyType<BodyT, ReturnT> = (data: BodyT) => Promise<FetchReturnType<ReturnT>>
type APIRequestWithIdAndBodyType<BodyT, ReturnT> = (id: number, data: BodyT) => Promise<FetchReturnType<ReturnT>>

type FetchReturnType<ReturnDataType> = {
	statusCode: number,
	data: ReturnDataType | string
};

type DeleteReturnType = null

type FamilyCreateBodyType = {
	name: string
}
type FamilyReturnType = []


type CharacterCreateBodyType = {
	data: FormData
}
type CharacterReturnType = []

type CapacityCreateBodyType = {
	name: string
	level: number
}
type CapacityReturnType = []

type LoginBodyType = {
	login: string, 
	password: string
}

type LoginReturnType = {
	token: string,
	user: {
		id: number,
		name: string,
		victory_number: number,
		role: 'player' | 'admin'
	}
}


export const getFamilies = async (withCharacters: boolean) => await fetchAPI({url: familyUrl(withCharacters)});

export const postNewFamily: APIRequestWithBodyType<FamilyCreateBodyType, FamilyReturnType> = async (data) => {
	const body = { ...data } as BodyInit
	return await fetchAPI({url: familyUrl(), method: 'POST', body});
}

export const deleteFamily: APIRequestWithIdType<DeleteReturnType> = async (familyId) => {
	return await fetchAPI({url: familyUrl(familyId), method: 'DELETE'});
};

export const postNewCharacter: APIRequestWithIdAndBodyType<CharacterCreateBodyType, CharacterReturnType> = async (familyId, data) => {
	return await fetchAPI({
		url: characterInFamilyUrl(familyId),
		method: 'POST',
		body: data as BodyInit & CharacterCreateBodyType,
		dataType: 'formData',
	});
};

export const deleteCharacter: APIRequestWithIdType<DeleteReturnType> = async (characterId) => {
	return await fetchAPI({ 
		url: characterUrl(characterId), 
		method: 'DELETE'
	});
};

export const addCharacterCapacity: APIRequestWithIdAndBodyType<CapacityCreateBodyType, CapacityReturnType> = async (characterId, data) => {
	return await fetchAPI({ 
		url: characterCapacityUrl(characterId), 
		method: 'POST', 
		body: { ...data } as BodyInit & CapacityCreateBodyType,
	});
};

export const removeCharacterCapacity = async (characterId: number, capacityId: number): Promise<FetchReturnType<DeleteReturnType>> => {
	return await fetchAPI({
		url: characterCapacityUrl(characterId, capacityId),
		method: 'DELETE',
	});
};

export const login: APIRequestWithBodyType<LoginBodyType, LoginReturnType> = async (data) => {
	return await fetchAPI({
		url: loginUrl(),
		method: 'POST',
		body: { ...data } as BodyInit & LoginBodyType,
	});
};

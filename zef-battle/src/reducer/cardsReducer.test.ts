import { cardsReducer as reducer } from './cardsReducer'
import { Action, ACTION_TYPES } from './cardsReducer'

let mockState: Family[] = []
beforeEach(() => {
  mockState = [
    {
      id: 1,
      name: 'Foo',
      characters: []
    },
    {
      id: 2,
      name: 'Bar',
      characters: [{
        id: 54,
        name: 'FooCharacter',
        picture: '/',
        family_id: 2,
        family_name: 'Bar', 
        total_level: 0,
        number_capacity: 1,
        capacity: [{
          id: 1, 
          name: 'FooCapacity', 
          level: 50,
          description: ''
        }]
      }]
    }
  ]
})

describe('cardsReducer', () => {
  it(`Should return a new state with all cards`, () => {
    const mockNewState = [...mockState]

    const action: Action = {
      type: ACTION_TYPES.GET_CARDS,
      payload: mockNewState,
    }

    const result = reducer([...mockState], action)
    expect(result).toEqual(mockNewState)
  })

  it(`Should return a new state with a new Family`, () => {
    const action: Action = {
      type: ACTION_TYPES.CREATE_FAMILY_CARD,
      payload: { id: 3, name: 'FooBar' },
    }

    const result = reducer([...mockState], action)
    expect(result.length).toEqual(mockState.length + 1)
    expect(result[0].id).toBe(3)
    expect(result[0].name).toBe('FooBar')
    expect(result[0].characters.length).toEqual(0)
  })

  it(`Should return a new state with one less family`, () => {
    const action: Action = {
      type: ACTION_TYPES.DELETE_FAMILY_CARD,
      payload: { family_id: 1 },
    }

    const result = reducer([...mockState], action)
    const resultTarget = result.find(({ id }) => id === 1)

    expect(result.length).toEqual(mockState.length - 1)
    expect(resultTarget).toBeUndefined()
  })

  it(`Should return a new state with a new character`, () => {
    const newCharacterId = 99
    const familyTargetId = 2
    
    const payload = {
      id: newCharacterId, 
      family_id: familyTargetId,
      name: 'BarCharacter',
    }
    const action: Action = {
      type: ACTION_TYPES.CREATE_CHARACTER_CARD,
      payload,
    }

    const result = reducer([...mockState], action)

    expect(result.length).toEqual(mockState.length)
    expect(result[1].characters[0].id).toBe(99)
    expect(result[1].characters[0].name).toBe('BarCharacter')
    expect(result[1].characters[0].family_id).toBe(familyTargetId)
    expect(result[1].characters[0].capacity.length).toEqual(0)
  })

  it(`Should return a new state with one less character`, () => {
    const deletedCharacterId = 54
    const familyTargetId = 2
    
    const payload = {
      character_id: deletedCharacterId, 
      family_id: familyTargetId,
    }
    const action: Action = {
      type: ACTION_TYPES.DELETE_CHARACTER_CARD,
      payload,
    }

    const result = reducer([...mockState], action)

    expect(result[1].characters.length).toEqual(0)
  })

  //TODO test 
  // it(`Should return a new state with a new capacity`, () => {
  //   
  // })

  

  it(`Should return a new state with one less capacity`, () => {
    const capacityId = 1
    const characterId = 54
    const familyId = 2
    
    const payload = {
      capacity_id: capacityId,
      character_id: characterId,
      family_id: familyId,
    }
    const action: Action = {
      type: ACTION_TYPES.DELETE_CHARACTER_CAPACITY,
      payload,
    }

    const result = reducer([...mockState], action)

    expect(result[1].characters[0].capacity.length).toEqual(0)
  })  
})

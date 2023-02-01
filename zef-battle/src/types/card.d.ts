type Capacity = {
  id: number
  name: string
  level: number
  description: string
}

type Character = {
  id: number
  name: string
  picture: string
  family_id: number
  family_name: string
  capacity: Capacity[]
  total_level: number
  number_capacity: number
}

type Family = {
  id: number
  name: string
  characters: Character[]
}

interface CardsContext {
  cards: Family[]
  dispatch?: Dispatch<{type: string, payload: any}>
}

interface FileWithPreview extends File {
  readonly preview?: string;
}

declare module "*.png" {
   const value: any;
   export = value;
}

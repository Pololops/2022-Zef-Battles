interface Capacity {
  id: number
  name: string
  level: number
  description: string
}

interface Character {
  id: number
  name: string
  picture: string
  family_id: number
  family_name: string
  capacity: Capacity[]
  total_level: number
  number_capacity: number
}

interface Family {
  [x: string]: any
  id: number
  name: string
  characters: Character[]
}

interface  CardsContext {
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

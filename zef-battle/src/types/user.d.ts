interface User {
  id: number
  name: string
  victory_number: number
  role: 'admin' | 'player'
}

interface Login {
  token: string
  user: User
}

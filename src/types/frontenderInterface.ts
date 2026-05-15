export interface Frontender {
  id: number
  name: string
  surname: string
  preference: string
  exp: number
}

// This is the shape of every API response from your Express server
export interface ApiResponse<T = null> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
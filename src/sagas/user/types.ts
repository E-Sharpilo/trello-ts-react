import { TUser } from '../../types/user'

export type LoginPass = {
  email: string,
  password: string
}

export type AuthResponse = {
  accessToken: string,
  refreshToken: string,
  user: TUser
}
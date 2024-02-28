import { PagedResponse, useRequest } from '../..'
import {
  UserDataDetailed,
  LoginRequest,
  LoginResponse,
  RegisterUserRequest,
  UpdateUserRequest,
  UserData
} from './Users'
import useSignIn from 'react-auth-kit/hooks/useSignIn'

export const useUsers = () => {
  const { post, get, put, del } = useRequest('users')
  const signIn = useSignIn()

  // TODO: passar mais paremetros vindo da api
  const getAllUsers = async (
    page: number,
    pageSize: number
  ): Promise<PagedResponse<UserData[]>> => {
    const { data } = await get(`?Page=${page}&PageSize=${pageSize}`)
    return data
  }

  const getUserById = async (id: string): Promise<UserDataDetailed> => {
    const { data } = await get(id)
    return data
  }

  const updateUser = async (
    id: string,
    request: UpdateUserRequest
  ): Promise<void> => {
    await put(id, request)
  }

  const deleteUser = async (id: string): Promise<void> => {
    await del(id)
  }

  const login = async (request: LoginRequest): Promise<void> => {
    const { data } = await post<LoginResponse>('login', request)
    signInUser(data)
  }

  const register = async (request: RegisterUserRequest): Promise<void> => {
    const { data } = await post<LoginResponse>('register', request)
    signInUser(data)
  }

  const signInUser = (data: LoginResponse) =>
    signIn({
      auth: {
        token: data.token,
        type: 'Bearer'
      },
      userState: data.user
    })

  return {
    login,
    register,
    updateUser,
    deleteUser,
    getUserById,
    getAllUsers
  }
}

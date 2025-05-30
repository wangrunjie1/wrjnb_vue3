import { request } from '../request'

// 用户类型
export interface User {
  id: string
  username: string
  email: string
  avatar?: string
  createTime: string
}

// 登录参数
export interface LoginParams {
  username: string
  password: string
}

// 注册参数
export interface RegisterParams extends LoginParams {
  email: string
}

// 用户注册
export function register(data: RegisterParams) {
  return request.post<User>('/user/register', data)
}

// 获取所有用户
export function getAllUsers() {
  return request.get<User[]>('/user')
}

// 获取当前用户信息
export function getUserInfo() {
  return request.get<User>('/user/info')
}

// 用户登录
export function login(data: LoginParams) {
  return request.post<{ token: string }>('/auth/login', data)
}

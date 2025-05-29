import axios from 'axios'

const instance = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

// 自动携带 token
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// 用户相关
export const register = (data: any) => instance.post('/user/register', data)
export const getAllUsers = () => instance.get('/user')
export const getUserInfo = () => instance.get('/user/info')

// 认证
export const login = (data: any) => instance.post('/auth/login', data)

// 文章相关
export const createArticle = (data: any) => instance.post('/articles/create', data)
export const getAllArticles = () => instance.get('/articles/allList')
export const getMyArticles = () => instance.get('/articles/myList')
export const deleteArticle = (id: string) => instance.delete(`/articles/delete?id=${id}`)
export const getArticleDetail = (id: string) => instance.get(`/articles/detail?id=${id}`)
export const isLiked = (id: string) => instance.get(`/articles/isLiked?id=${id}`)
export const likeArticle = (id: string) => instance.post(`/articles/like?id=${id}`)
export const unlikeArticle = (id: string) => instance.post(`/articles/unlike?id=${id}`)
export const getLikeCount = (id: string) => instance.get(`/articles/likeCount?id=${id}`)
export const commentArticle = (id: string, content: string) =>
  instance.post(`/articles/comment?id=${id}`, { content })
export const getComments = (id: string) => instance.get(`/articles/comments?id=${id}`)

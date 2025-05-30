import { request } from '../request'

// 文章类型
export interface Article {
  id: string
  title: string
  content: string
  author: string
  createTime: string
  updateTime: string
  tags?: string[]
  category?: string
}

// 评论类型
export interface Comment {
  id: string
  content: string
  author: string
  createTime: string
}

// 获取所有文章
export function getAllArticles() {
  return request.get<Article[]>('/articles/allList')
}

// 获取我的文章
export function getMyArticles() {
  return request.get<Article[]>('/articles/myList')
}

// 获取文章详情
export function getArticleDetail(id: string) {
  return request.get<Article>(`/articles/detail?id=${id}`)
}

// 创建文章
export function createArticle(data: Omit<Article, 'id' | 'createTime' | 'updateTime'>) {
  return request.post<Article>('/articles/create', data)
}

// 删除文章
export function deleteArticle(id: string) {
  return request.delete<void>(`/articles/delete?id=${id}`)
}

// 点赞相关
export function isLiked(id: string) {
  return request.get<boolean>(`/articles/isLiked?id=${id}`)
}

export function likeArticle(id: string) {
  return request.post<void>(`/articles/like?id=${id}`)
}

export function unlikeArticle(id: string) {
  return request.post<void>(`/articles/unlike?id=${id}`)
}

export function getLikeCount(id: string) {
  return request.get<number>(`/articles/likeCount?id=${id}`)
}

// 评论相关
export function commentArticle(id: string, content: string) {
  return request.post<void>(`/articles/comment?id=${id}`, { content })
}

export function getComments(id: string) {
  return request.get<Comment[]>(`/articles/comments?id=${id}`)
}

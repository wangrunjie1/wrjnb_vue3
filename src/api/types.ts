// API 响应基础类型
export interface ApiResponse<T = any> {
  code: number
  data: T
  message: string
}

// API 错误类型
export interface ApiError {
  code: number
  message: string
  details?: any
}

// 请求配置类型
export interface RequestConfig extends RequestInit {
  showError?: boolean // 是否显示错误提示
  loading?: boolean // 是否显示加载状态
}

// 分页请求参数
export interface PaginationParams {
  page: number
  pageSize: number
}

// 分页响应数据
export interface PaginationData<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

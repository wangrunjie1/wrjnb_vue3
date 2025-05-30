import { ElMessage } from 'element-plus'
import type { ApiResponse, RequestConfig } from './types'

// API 基础配置
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'
const DEFAULT_TIMEOUT = 10000

// 创建请求实例
class Request {
  private static instance: Request
  private loadingCount = 0

  private constructor() {}

  public static getInstance(): Request {
    if (!Request.instance) {
      Request.instance = new Request()
    }
    return Request.instance
  }

  // 显示加载状态
  private showLoading() {
    this.loadingCount++
    // TODO: 实现全局 loading
  }

  // 隐藏加载状态
  private hideLoading() {
    this.loadingCount--
    if (this.loadingCount <= 0) {
      this.loadingCount = 0
      // TODO: 隐藏全局 loading
    }
  }

  // 处理请求错误
  private handleError(error: Error, showError: boolean) {
    if (showError) {
      ElMessage.error(error.message || '请求失败')
    }
    return Promise.reject(error)
  }

  // 发送请求
  public async request<T>(url: string, config: RequestConfig = {}): Promise<ApiResponse<T>> {
    const { showError = true, loading = true, ...restConfig } = config

    // 显示加载状态
    if (loading) {
      this.showLoading()
    }

    try {
      // 获取 token
      const token = localStorage.getItem('token')
      const headers = new Headers({
        'Content-Type': 'application/json',
        ...(restConfig.headers || {}),
      })

      // 如果存在 token，添加到 headers
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      const response = await fetch(`${BASE_URL}${url}`, {
        ...restConfig,
        headers,
        signal: AbortSignal.timeout(DEFAULT_TIMEOUT),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: ApiResponse<T> = await response.json()

      // 处理业务错误
      if (data.code !== 0) {
        throw new Error(data.message || '请求失败')
      }

      return data
    } catch (error) {
      return this.handleError(error as Error, showError)
    } finally {
      if (loading) {
        this.hideLoading()
      }
    }
  }

  // GET 请求
  public get<T>(
    url: string,
    params?: Record<string, string>,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : ''
    return this.request<T>(`${url}${queryString}`, {
      method: 'GET',
      ...config,
    })
  }

  // POST 请求
  public post<T>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      method: 'POST',
      body: JSON.stringify(data),
      ...config,
    })
  }

  // PUT 请求
  public put<T>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...config,
    })
  }

  // DELETE 请求
  public delete<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      method: 'DELETE',
      ...config,
    })
  }
}

export const request = Request.getInstance()

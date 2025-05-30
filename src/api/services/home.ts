import { request } from '../request'

export function httpGetDanmu() {
  return request.get<any>('/danmu')
}

export function httpSendDanmu(params = {}) {
  return request.post<any>('/danmu', params)
}

export function httpGetMsgboard() {
  return request.get<any>('/msgboard')
}

export function httpSendMsgboard(params = {}) {
  return request.post<any>('/msgboard', params)
}

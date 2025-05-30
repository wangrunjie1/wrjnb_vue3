import { request } from '../request'

export function httpGetDanmu() {
  return request.get('/danmu')
}

export function httpSendDanmu(params = {}) {
  return request.post('/danmu', params)
}

export function httpGetMsgboard() {
  return request.get('/msgboard')
}

export function httpSendMsgboard(params = {}) {
  return request.post('/msgboard', params)
}

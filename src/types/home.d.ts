interface Danmu {
  id: string | number
  text: string
  color: string
  left?: number
  duration: number
  key?: string
}

interface MsgBoardItem {
  id: string | number
  avatar: string
  location: string
  time: string
  html: string
}

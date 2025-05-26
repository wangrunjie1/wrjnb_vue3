import express from 'express'
import fs from 'fs'
import path from 'path'
import cors from 'cors'
import axios from 'axios'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const FILE = path.join(__dirname, 'danmu.json')
app.use(cors())
app.use(express.json({ limit: '2mb' }))

// ========== 弹幕功能 ==========
// 获取弹幕
app.get('/danmu-api/danmu', (req, res) => {
  fs.readFile(FILE, 'utf-8', (err, data) => {
    if (err) return res.json([])
    try {
      res.json(JSON.parse(data))
    } catch {
      res.json([])
    }
  })
})

// 发送弹幕
app.post('/danmu-api/danmu', (req, res) => {
  const { text, color } = req.body
  if (!text || typeof text !== 'string' || text.length > 40) {
    return res.json({ success: false })
  }
  const msg = {
    id: Date.now() + Math.random().toString(36).slice(2, 8),
    text,
    color,
    time: Date.now(),
  }
  fs.readFile(FILE, 'utf-8', (err, data) => {
    let list = []
    if (!err) {
      try {
        list = JSON.parse(data)
      } catch {}
    }
    list.push(msg)
    // 最多只保留100条
    if (list.length > 100) list = list.slice(-100)
    fs.writeFile(FILE, JSON.stringify(list), () => {
      res.json({ success: true })
    })
  })
})

// ========== 留言板功能 ==========
const MSG_FILE = './msgboard.json'
function loadMsgList() {
  try {
    return JSON.parse(fs.readFileSync(MSG_FILE, 'utf8'))
  } catch {
    return []
  }
}
function saveMsgList(list) {
  fs.writeFileSync(MSG_FILE, JSON.stringify(list, null, 2), 'utf8')
}
function getRandomAvatar(ip) {
  // 随机头像，基于ip hash
  const colors = ['409eff', '67c23a', 'e6a23c', 'f56c6c', '909399', 'ffb300', '40c4ff', 'ff4081']
  const idx = ip.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % colors.length
  // 修复：dicebear 7.x 需要 backgroundColor[]=xxx（不带#），且参数为数组
  return `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(ip)}&backgroundColor[]=${colors[idx]}`
}
async function getIpInfo(ip) {
  try {
    const resp = await axios.get(
      `https://opendata.baidu.com/api.php?query=${ip}&co=&resource_id=6006&oe=utf8`
    )
    if (
      resp.data &&
      resp.data.status === '0' &&
      Array.isArray(resp.data.data) &&
      resp.data.data.length > 0
    ) {
      // 优先 location 字段，否则 fallback
      return resp.data.data[0].location || '未知归属地'
    }
  } catch {}
  return '未知归属地'
}

// 获取留言列表
app.get('/danmu-api/msgboard', async (req, res) => {
  const list = loadMsgList()
  // 直接返回已有头像字段
  res.json(list)
})

// 发布留言
app.post('/danmu-api/msgboard', async (req, res) => {
  const html = req.body.html || ''
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.connection.remoteAddress || ''
  const location = await getIpInfo(ip)
  const list = loadMsgList()
  // 查找该ip是否已有头像
  let avatar = ''
  const exist = list.find(item => item.ip === ip && item.avatar)
  if (exist) {
    avatar = exist.avatar
  } else {
    avatar = getRandomAvatar(ip)
  }
  list.unshift({
    id: Date.now() + Math.random().toString(36).slice(2, 7),
    html,
    ip,
    avatar,
    location,
    time: Date.now(),
  })
  // 最多保存100条
  saveMsgList(list.slice(0, 100))
  res.json({ success: true })
})

const port = 3001
app.listen(port, () => {
  console.log('danmu-server running at http://localhost:' + port)
})

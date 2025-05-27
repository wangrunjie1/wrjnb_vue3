import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const danmuList = ref<Danmu[]>([])
const allDanmu = ref<Danmu[]>([])
const showDanmuInput = ref(false)
const danmuInput = ref('')
const danmuColor = ref('#409eff')
const danmuColors = ['#409eff', '#67c23a', '#e6a23c', '#f56c6c', '#909399']
const danmuSpeed = ref(5)

let danmuTimer: number | null = null
let danmuIndex = 0

function fetchDanmu() {
  fetch('/danmu-api/danmu')
    .then((res) => res.json())
    .then((list) => {
      allDanmu.value = list as Danmu[]
      updateDanmuList()
    })
}

function updateDanmuList() {
  const maxShow = 20
  if (allDanmu.value.length === 0) {
    danmuList.value = []
    return
  }
  const showList = []
  for (let i = 0; i < Math.min(maxShow, allDanmu.value.length); i++) {
    const idx = (danmuIndex + i) % allDanmu.value.length
    const msg = allDanmu.value[idx]
    showList.push({
      ...msg,
      left: Math.random() * 40 + 10,
      duration: Math.random() * 3 + 6,
      key: msg.id + '-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
    })
  }
  danmuList.value = showList
  danmuIndex = (danmuIndex + 1) % allDanmu.value.length
}

function sendDanmu() {
  if (!danmuInput.value.trim()) {
    ElMessage.warning('请输入内容')
    return
  }
  fetch('/danmu-api/danmu', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: danmuInput.value.trim(),
      color: danmuColor.value,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        danmuInput.value = ''
        showDanmuInput.value = false
        fetchDanmu()
        ElMessage.success('发送成功')
      } else {
        ElMessage.error('发送失败')
      }
    })
}

function getDanmuDuration(base: number) {
  const speedMap = [0.4, 0.55, 0.7, 0.85, 1, 1.2, 1.4, 1.7, 2, 2.5]
  return base * speedMap[danmuSpeed.value - 1]
}

function getSpeedLabel(n: number) {
  if (n === 1) return '极快'
  if (n === 2) return '很快'
  if (n === 3) return '较快'
  if (n === 4) return '快'
  if (n === 5) return '中等'
  if (n === 6) return '稍慢'
  if (n === 7) return '慢'
  if (n === 8) return '较慢'
  if (n === 9) return '很慢'
  if (n === 10) return '极慢'
  return ''
}

// 自动轮询
import { onMounted, onBeforeUnmount } from 'vue'
onMounted(() => {
  fetchDanmu()
  danmuTimer = window.setInterval(() => {
    fetchDanmu()
    setTimeout(updateDanmuList, 1000)
  }, 2000)
})
onBeforeUnmount(() => {
  if (danmuTimer) clearInterval(danmuTimer)
})

export function useDanmu() {
  return {
    danmuList,
    showDanmuInput,
    danmuInput,
    danmuColor,
    danmuColors,
    danmuSpeed,
    getDanmuDuration,
    getSpeedLabel,
    sendDanmu,
    fetchDanmu,
    updateDanmuList,
  }
}

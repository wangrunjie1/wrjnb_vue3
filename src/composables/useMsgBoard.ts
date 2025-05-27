import { ref, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'

const showMsgBoard = ref(false)
const showMsgInput = ref(false)
const msgInputTitle = ref('')
const msgInputText = ref('')
const msgInputImgs = ref<string[]>([])
const msgList = ref<MsgBoardItem[]>([])

const msgInputPreview = computed(() => {
  let html = msgInputText.value.replace(/\n/g, '<br/>')
  if (msgInputImgs.value.length) {
    html +=
      '<br/>' +
      msgInputImgs.value
        .map(
          (src) =>
            `<img src="${src}" style="max-width:120px;vertical-align:middle;margin:2px 4px;" />`,
        )
        .join('')
  }
  if (msgInputTitle.value.trim()) {
    html = `<strong>${msgInputTitle.value.trim()}</strong><br/>` + html
  }
  return html
})

function handleImgUpload(file: File) {
  return new Promise<void>((resolve) => {
    const reader = new FileReader()
    reader.onload = () => {
      msgInputImgs.value.push(reader.result as string)
      resolve()
    }
    reader.readAsDataURL(file)
  })
}
function removeImg(idx: number) {
  msgInputImgs.value.splice(idx, 1)
}

function sendMsg() {
  if (
    !msgInputText.value.trim() &&
    !msgInputTitle.value.trim() &&
    msgInputImgs.value.length === 0
  ) {
    ElMessage.warning('请输入内容')
    return
  }
  fetch('/danmu-api/msgboard', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ html: msgInputPreview.value }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        msgInputText.value = ''
        msgInputTitle.value = ''
        msgInputImgs.value = []
        showMsgInput.value = false
        fetchMsgList()
        ElMessage.success('发布成功')
      } else {
        ElMessage.error('发布失败')
      }
    })
}

function fetchMsgList() {
  fetch('/danmu-api/msgboard')
    .then((res) => res.json())
    .then((list) => {
      msgList.value = (list as MsgBoardItem[]).map((item) => ({
        ...item,
        time: new Date(item.time).toLocaleString(),
      }))
    })
}

let msgBoardTimer: number | null = null
watch(showMsgBoard, (val) => {
  if (val) {
    fetchMsgList()
    if (msgBoardTimer) clearInterval(msgBoardTimer)
    msgBoardTimer = window.setInterval(fetchMsgList, 3000)
  } else {
    if (msgBoardTimer) {
      clearInterval(msgBoardTimer)
      msgBoardTimer = null
    }
  }
})

import { onBeforeUnmount } from 'vue'
onBeforeUnmount(() => {
  if (msgBoardTimer) clearInterval(msgBoardTimer)
})

export function useMsgBoard() {
  return {
    showMsgBoard,
    showMsgInput,
    msgInputTitle,
    msgInputText,
    msgInputImgs,
    msgInputPreview,
    msgList,
    handleImgUpload,
    removeImg,
    sendMsg,
    fetchMsgList,
  }
}

<template>
  <main class="home-container dynamic-bg">
    <!-- 弹幕留言墙 -->
    <div class="danmu-wall">
      <transition-group name="danmu" tag="div">
        <div
          v-for="(msg, idx) in danmuList"
          :key="msg.key || msg.id"
          class="danmu-msg"
          :style="{
            color: msg.color,
            top: idx * 2.2 + 2 + 'em',
            left: msg.left + '%',
            animationDuration: getDanmuDuration(msg.duration) + 's',
          }"
        >
          {{ msg.text }}
        </div>
      </transition-group>
    </div>
    <section class="hero">
      <h1 @click="titleEasterEgg" :class="{ shake: isShaking }">欢迎来到我的网站</h1>
      <h2
        class="subtitle"
        @click="showCat = !showCat"
        @mouseenter="isSubtitleHover = true"
        @mouseleave="isSubtitleHover = false"
        :class="{ gradient: isSubtitleHover }"
      >
        发现更多乐趣 <span v-if="showCat">🐱</span>
      </h2>
      <p>探索更多精彩内容，享受极致体验。</p>
      <div class="center-btn-group">
        <el-button
          size="large"
          @mousedown="handleBtnMouseDown"
          @mouseenter="isBouncing = true"
          @mouseleave="isBouncing = false"
          :class="{ bounce: isBouncing }"
        >
          了解更多
        </el-button>
        <!-- 新增工具箱入口按钮 -->
        <el-button
          size="large"
          style="margin-left: 1em; background: #43e97b"
          @click="$router.push('/tools')"
        >
          🧰 实用工具箱
        </el-button>
        <!-- 发送弹幕按钮 -->
        <el-button
          size="large"
          class="danmu-btn"
          type="primary"
          :icon="ChatLineRound"
          @click="showDanmuInput = true"
          style="margin-left: 1em"
        >
          发送弹幕
        </el-button>
        <!-- 留言板按钮 -->
        <el-button
          size="large"
          class="msgboard-btn"
          type="primary"
          :icon="ChatLineRound"
          @click="showMsgBoard = true"
          style="margin-left: 1em"
          >留言板</el-button
        >
      </div>
      <!-- 新增彩蛋大师相关内容区域 -->
      <transition name="fade">
        <div v-if="showSecret" class="secret-message">🎉 恭喜你发现了隐藏彩蛋！🎉</div>
      </transition>
      <transition name="fade">
        <div v-if="devInfo" class="dev-info">
          👨‍💻 开发者：wrj<br />
          <span style="font-size: 0.9em">（你是怎么发现我的？）</span>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="eggMaster" class="egg-master">🥚 你已成为彩蛋大师！🥚</div>
      </transition>
      <transition name="fade">
        <div v-if="showEggTips" class="egg-tips">
          <ul>
            <li>Ctrl+Alt+E：显示隐藏彩蛋</li>
            <li>L：切换背景</li>
            <li>副标题点击：出现猫咪</li>
            <li>按钮连续双击：显示开发者信息</li>
            <li>C：彩蛋收集家称号</li>
            <li>↑ ↑ ↓ ↓ ← → ← → b a：彩蛋大师称号</li>
          </ul>
        </div>
      </transition>
      <transition name="fade">
        <div
          v-if="showKfcError || isThursday"
          class="kfc-error"
          @click="showKfcPay = true"
          style="cursor: pointer"
        >
          <span class="kfc-error-title">Exception Error</span><br />
          <span class="kfc-error-msg"
            >Syntax Unexpected string: <b>KFC Crazy Thursday need 50 RMB</b></span
          >
        </div>
      </transition>
      <transition name="fade">
        <div v-if="showKfcTranslation" class="kfc-translation" @click="showKfcTranslation = false">
          <span class="kfc-translation-title">中文翻译</span><br />
          <span class="kfc-translation-msg"
            >语法错误：KFC 疯狂星期四需要50元<br />（点此关闭）</span
          >
        </div>
      </transition>
      <transition name="fade">
        <div v-if="showKfcPay" class="kfc-pay" @click="showKfcPay = false">
          <span class="kfc-pay-title">微信收款码（点此关闭）</span>
          <div class="kfc-pay-imgs">
            <img src="@/assets/images/wx_pay_code1.png" alt="微信收款码1" />
            <img src="@/assets/images/wx_pay_code2.png" alt="微信收款码2" />
          </div>
        </div>
      </transition>
    </section>
    <!-- 弹幕速度调节按钮 -->
    <el-dropdown class="danmu-speed-btn" trigger="click">
      <el-button type="primary" :icon="Operation"> 弹幕速度 </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="n in 10"
            :key="n"
            @click="danmuSpeed = n"
            :class="{ 'is-active': danmuSpeed === n }"
          >
            速度{{ n }}（{{ getSpeedLabel(n) }}）
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <!-- 留言输入弹窗 -->
    <el-dialog v-model="showDanmuInput" title="留言墙" width="320px" :close-on-click-modal="false">
      <el-input
        v-model="danmuInput"
        maxlength="40"
        show-word-limit
        placeholder="说点什么吧~"
        @keyup.enter="sendDanmu"
      />
      <div style="margin: 12px 0 0 0">
        <span>选择颜色：</span>
        <el-radio-group v-model="danmuColor" size="small">
          <el-radio-button v-for="c in danmuColors" :key="c" :label="c">
            <span :style="{ color: c }">■</span>
          </el-radio-button>
        </el-radio-group>
      </div>
      <template #footer>
        <el-button @click="showDanmuInput = false">取消</el-button>
        <el-button type="primary" @click="sendDanmu">发送</el-button>
      </template>
    </el-dialog>
    <!-- 留言板弹窗 -->
    <el-dialog v-model="showMsgBoard" title="留言板" width="80%" :close-on-click-modal="false">
      <div>
        <el-button type="primary" @click="showMsgInput = true" style="margin-bottom: 1em">
          发布留言
        </el-button>
        <el-divider />
        <el-scrollbar height="56vh">
          <div v-if="msgList.length === 0" class="msgboard-empty">
            暂无留言
          </div>
          <div v-for="item in msgList" :key="item.id" class="msgboard-item-outer">
            <div class="msgboard-item">
              <div class="msgboard-header">
                <img :src="item.avatar" class="msgboard-avatar" />
                <!-- <span class="msgboard-ip">{{ item.ip }}</span> -->
                <div class="msgboard-meta">
                  <span class="msgboard-loc">{{ item.location }}</span>
                  <span class="msgboard-time">{{ item.time }}</span>
                </div>
              </div>
              <div class="msgboard-content" v-html="item.html"></div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </el-dialog>
    <!-- 留言富文本输入弹窗 -->
    <el-dialog v-model="showMsgInput" title="发布留言" width="420px" :close-on-click-modal="false">
      <el-form @submit.prevent>
        <el-form-item>
          <el-input
            v-model="msgInputTitle"
            maxlength="30"
            show-word-limit
            placeholder="标题（可选）"
          />
        </el-form-item>
        <el-form-item>
          <!-- 优化：用textarea显示内容，图片用chips预览，不在输入框显示base64 -->
          <el-input
            v-model="msgInputText"
            type="textarea"
            :rows="4"
            maxlength="200"
            show-word-limit
            placeholder="说点什么吧~ 支持插入图片"
          />
        </el-form-item>
        <el-form-item>
          <el-upload :show-file-list="false" :before-upload="handleImgUpload" accept="image/*">
            <el-button size="small" icon="el-icon-picture">插入图片</el-button>
          </el-upload>
          <div
            v-if="msgInputImgs.length"
            style="margin-left: 1em; display: flex; gap: 8px; flex-wrap: wrap"
          >
            <div v-for="(img, idx) in msgInputImgs" :key="idx" style="position: relative">
              <img
                :src="img"
                style="
                  width: 48px;
                  height: 48px;
                  object-fit: cover;
                  border-radius: 6px;
                  border: 1px solid #eee;
                "
              />
              <el-icon
                style="
                  position: absolute;
                  top: -8px;
                  right: -8px;
                  cursor: pointer;
                  color: #f56c6c;
                  background: #fff;
                  border-radius: 50%;
                "
                @click="removeImg(idx)"
                ><i class="el-icon el-icon-close"></i
              ></el-icon>
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sendMsg">发布</el-button>
          <el-button @click="showMsgInput = false" style="margin-left: 1em">取消</el-button>
        </el-form-item>
      </el-form>
      <div style="margin-top: 1em">
        <div style="font-size: 13px; color: #888">预览：</div>
        <div class="msgboard-content" v-html="msgInputPreview"></div>
      </div>
    </el-dialog>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ChatLineRound, Operation } from '@element-plus/icons-vue'

const clickCount = ref(0)
const isShaking = ref(false)
const showSecret = ref(false)
const showCat = ref(false)
const isBouncing = ref(false)
const devInfo = ref(false)
const isSubtitleHover = ref(false)
const showEggTips = ref(false)
const eggMaster = ref(false)
const isThursday = new Date().getDay() === 4
const showKfcError = ref(false)
const showKfcTranslation = ref(false)
const showKfcPay = ref(false)
const showMsgBoard = ref(false)
const showMsgInput = ref(false)

const danmuList = ref<any[]>([])
const allDanmu = ref<any[]>([])
const showDanmuInput = ref(false)
const danmuInput = ref('')
const danmuColor = ref('#409eff')
const danmuColors = ['#409eff', '#67c23a', '#e6a23c', '#f56c6c', '#909399']
const msgInputTitle = ref('')
const msgInputText = ref('')
const msgInputImgs = ref<string[]>([])
const msgList = ref<any[]>([])
// 新增：弹幕速度挡位（1-10，1最快，10最慢，默认5）
const danmuSpeed = ref(5)

let danmuTimer: number | null = null
let danmuIndex = 0

// 自定义双击检测
let lastClickTime = 0
let clickTimer: number | null = null
function handleBtnMouseDown() {
  const now = Date.now()
  if (now - lastClickTime < 400) {
    // 双击
    if (clickTimer) {
      clearTimeout(clickTimer)
      clickTimer = null
    }
    showDevInfo()
    lastClickTime = 0
  } else {
    // 单击，延迟执行
    lastClickTime = now
    if (clickTimer) clearTimeout(clickTimer)
    clickTimer = window.setTimeout(() => {
      exploreMore()
      clickTimer = null
    }, 350)
  }
}

function exploreMore() {
  clickCount.value++
  if (clickCount.value === 3) {
    alert('你真的很想了解更多吗？')
  } else if (clickCount.value === 5) {
    alert('再点一次试试？')
  } else if (clickCount.value > 7) {
    alert('好吧，暂时真的没有更多内容了😂')
    clickCount.value = 0
  } else {
    alert('更多内容即将上线，敬请期待！')
  }
}

function titleEasterEgg() {
  isShaking.value = true
  setTimeout(() => {
    isShaking.value = false
  }, 600)
}

function showDevInfo() {
  devInfo.value = true
  setTimeout(() => (devInfo.value = false), 3500)
}

// 彩蛋大师秘籍
const konamiCode = [
  'arrowup',
  'arrowup',
  'arrowdown',
  'arrowdown',
  'arrowleft',
  'arrowright',
  'arrowleft',
  'arrowright',
  'b',
  'a',
]
let konamiIndex = 0

function handleKeydown(e: KeyboardEvent) {
  if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'e') {
    showSecret.value = !showSecret.value
  }
  if (e.key.toLowerCase() === 'c') {
    alert('你已获得“彩蛋收集家”称号！')
  }
  if (e.key === '?') {
    showEggTips.value = true
    setTimeout(() => (showEggTips.value = false), 5000)
  }
  if (e.key.toLowerCase() === 'k') {
    showKfcError.value = true
    setTimeout(() => (showKfcError.value = false), 3500)
  }
  // konami code
  if (e.key.toLowerCase() === konamiCode[konamiIndex]) {
    konamiIndex++
    if (konamiIndex === konamiCode.length) {
      eggMaster.value = true
      setTimeout(() => (eggMaster.value = false), 4000)
      konamiIndex = 0
    }
  } else {
    konamiIndex = 0
  }
}

function fetchDanmu() {
  fetch('/danmu-api/danmu')
    .then((res) => res.json())
    .then((list) => {
      // 历史弹幕全部保存，顺序展示
      allDanmu.value = list as any[]
      updateDanmuList()
    })
}

function updateDanmuList() {
  // 屏幕上最多显示20条，循环展示历史弹幕
  const maxShow = 20
  if (allDanmu.value.length === 0) {
    danmuList.value = []
    return
  }
  // 取出maxShow条，按顺序循环
  const showList = []
  for (let i = 0; i < Math.min(maxShow, allDanmu.value.length); i++) {
    const idx = (danmuIndex + i) % allDanmu.value.length
    const msg = allDanmu.value[idx]
    showList.push({
      ...msg,
      left: Math.random() * 40 + 10,
      duration: Math.random() * 3 + 6, // 这里的duration会被getDanmuDuration处理
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

// 富文本预览（简单支持图片和换行）
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

// 处理图片上传，base64存入数组，不插入输入框
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

// 发布留言
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

// 获取留言列表
function fetchMsgList() {
  fetch('/danmu-api/msgboard')
    .then((res) => res.json())
    .then((list) => {
      msgList.value = (list as any[]).map((item) => ({
        ...item,
        time: new Date(item.time).toLocaleString(),
      }))
    })
}

let msgBoardTimer: number | null = null
// 监听留言板弹窗打开时自动刷新留言（打开时立即刷新并开始轮询，关闭时停止轮询）
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

function getDanmuDuration(base: number) {
  // 挡位1-10，1最快，10最慢，线性映射到0.4~2.5倍速度
  const speedMap = [0.4, 0.55, 0.7, 0.85, 1, 1.2, 1.4, 1.7, 2, 2.5]
  return base * speedMap[danmuSpeed.value - 1]
}

function getSpeedLabel(n: number) {
  // 1-10 挡位描述
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

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  // 进来就显示KFC错误（如果是星期四）
  if (isThursday) {
    showKfcError.value = false // 保证keydown触发时不会重复
  }
  fetchDanmu()
  fetchMsgList()
  danmuTimer = window.setInterval(() => {
    fetchDanmu()
    // 每次获取后自动切换弹幕
    setTimeout(updateDanmuList, 1000)
  }, 2000)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (danmuTimer) clearInterval(danmuTimer)
  if (msgBoardTimer) clearInterval(msgBoardTimer)
})
</script>

<style lang="scss" scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px);
  color: #444; // 更柔和的深灰色
  font-family: 'Segoe UI', Arial, sans-serif;
  text-align: center;
  transition: background 0.5s;
  position: relative;
  overflow: hidden;
}

.dynamic-bg {
  /* 更加浅色的动态渐变动画背景 */
  background: linear-gradient(
    270deg,
    #e0ffe8,
    #e0f7fa,
    #f8e8ff,
    #e3f6ff,
    #eafff3,
    #fbefff,
    #ffeaea,
    #e0ffe8
  );
  background-size: 1600% 1600%;
  animation: gradientMove 18s ease-in-out infinite;
}

@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }
  25% {
    background-position: 50% 100%;
  }
  50% {
    background-position: 100% 50%;
  }
  75% {
    background-position: 50% 0%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.hero {
  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    cursor: pointer;
    user-select: none;
    transition: color 0.3s;

    &.shake {
      animation: shake 0.6s;
      color: #ffeb3b;
      text-shadow:
        0 0 10px #ffeb3b,
        0 0 20px #f44336;
    }
  }

  .subtitle {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #ffe082;
    cursor: pointer;
    transition:
      color 0.3s,
      background 0.3s;
    user-select: none;
    display: inline-block;
    padding: 0 0.5em;

    &.gradient {
      background: linear-gradient(90deg, #ffb300, #ff4081, #40c4ff, #69f0ae);
      background-size: 200% 100%;
      background-position: left;
      color: transparent;
      -webkit-background-clip: text;
      background-clip: text;
      animation: gradient-move 1.2s linear infinite;
    }
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }

  button {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition:
      background-color 0.3s,
      transform 0.2s;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

    &.bounce {
      animation: bounce 0.5s;
    }

    &:hover {
      background-color: #0056b3;
      transform: scale(1.05);
    }
  }
}

@keyframes shake {
  10%,
  90% {
    transform: translateX(-2px);
  }
  20%,
  80% {
    transform: translateX(4px);
  }
  30%,
  50%,
  70% {
    transform: translateX(-8px);
  }
  40%,
  60% {
    transform: translateX(8px);
  }
}

@keyframes gradient-move {
  0% {
    background-position: left;
  }
  100% {
    background-position: right;
  }
}

.secret-message {
  margin-top: 2rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  color: #fffde4;
  font-size: 1.3rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
  letter-spacing: 2px;
}

.dev-info {
  margin-top: 1.5rem;
  padding: 0.8rem 1.5rem;
  background: rgba(0, 0, 0, 0.18);
  border-radius: 8px;
  color: #ffe082;
  font-size: 1.1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.egg-master {
  margin-top: 1.5rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.18);
  border-radius: 10px;
  color: #ffeb3b;
  font-size: 1.4rem;
  font-weight: bold;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.14);
  letter-spacing: 2px;
}

.egg-tips {
  margin-top: 1.5rem;
  padding: 1rem 2rem;
  background: rgba(0, 0, 0, 0.22);
  border-radius: 10px;
  color: #fffde4;
  font-size: 1.1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
  text-align: left;
  display: inline-block;
}

.kfc-error {
  position: fixed;
  top: 180px;
  left: 50%;
  z-index: 1000;
  width: 90vw;
  max-width: 700px;
  min-width: 220px;
  margin: 0 auto;
  /* 直接用margin-left替代transform，避免初始抖动 */
  margin-left: calc(-45vw);
  /* 若屏幕宽度大于700px，margin-left为-350px */
  /* 下面的媒体查询会修正 */
  padding: 2rem 1.2rem;
  background: #2d2d2d;
  border-radius: 16px;
  color: #ff5252;
  font-size: 1.15rem;
  font-family: 'Fira Mono', 'Consolas', monospace;
  box-shadow: 0 4px 24px rgba(255, 82, 82, 0.22);
  border: 2.5px solid #ff5252;
  animation: kfc-error-pop 0.5s;
  text-align: left;
  word-break: break-all;
  cursor: pointer;

  &-title {
    font-weight: bold;
    font-size: 1.15em;
  }
  &-msg {
    color: #fff;
    font-size: 1em;
  }
}

.kfc-translation {
  position: fixed;
  top: 180px;
  left: 50%;
  z-index: 1001;
  width: 90vw;
  max-width: 700px;
  min-width: 220px;
  margin: 0 auto;
  margin-left: calc(-45vw);
  padding: 2rem 1.2rem;
  background: #fffbe6;
  border-radius: 16px;
  color: #d32f2f;
  font-size: 1.15rem;
  font-family: 'Fira Mono', 'Consolas', monospace;
  box-shadow: 0 4px 24px rgba(255, 82, 82, 0.22);
  border: 2.5px solid #ff5252;
  animation: kfc-error-pop 0.5s;
  text-align: left;
  word-break: break-all;
  cursor: pointer;

  &-title {
    font-weight: bold;
    font-size: 1.15em;
  }
  &-msg {
    color: #333;
    font-size: 1em;
  }
}

.kfc-pay {
  position: fixed;
  top: 180px;
  left: 50%;
  z-index: 1001;
  width: 90vw;
  max-width: 700px;
  min-width: 220px;
  margin: 0 auto;
  margin-left: calc(-45vw);
  padding: 2rem 1.2rem 1.2rem 1.2rem;
  background: #fff;
  border-radius: 16px;
  color: #222;
  font-size: 1.15rem;
  font-family: 'Fira Mono', 'Consolas', monospace;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.18);
  border: 2.5px solid #ff5252;
  animation: kfc-error-pop 0.5s;
  text-align: center;
  word-break: break-all;
  cursor: pointer;

  &-title {
    font-weight: bold;
    font-size: 1.15em;
    color: #d32f2f;
    margin-bottom: 1em;
    display: block;
  }
  &-imgs {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2vw;
    margin-top: 1em;
    flex-wrap: wrap;

    img {
      width: 180px;
      max-width: 38vw;
      border-radius: 10px;
      border: 1.5px solid #eee;
      background: #fafafa;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      margin-bottom: 0.5em;
    }
  }
}

.danmu-wall {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 44vh;
  pointer-events: none;
  z-index: 10;
  overflow: hidden;
}
.danmu-msg {
  position: absolute;
  white-space: nowrap;
  font-size: 1.1em;
  font-weight: bold;
  opacity: 0.92;
  animation: danmu-move linear;
  animation-fill-mode: forwards;
  pointer-events: none;
}
@keyframes danmu-move {
  0% {
    transform: translateX(100vw);
  }
  100% {
    transform: translateX(-100vw);
  }
}
.danmu-btn {
  position: fixed;
  right: 18px;
  bottom: 24px;
  z-index: 1002;
}
.danmu-speed-btn {
  position: fixed;
  right: 18px;
  bottom: 90px;
  z-index: 1003;
}
/* 新增弹幕速度挡位选中样式 */
:deep(.el-dropdown-menu__item.is-active) {
  background: #409eff !important;
  color: #fff !important;
  font-weight: bold;
}
@media (min-width: 780px) {
  .kfc-error,
  .kfc-translation,
  .kfc-pay {
    width: 700px;
    margin-left: -350px;
  }
}
@media (max-width: 600px) {
  .kfc-error,
  .kfc-translation,
  .kfc-pay {
    top: 40px;
    padding: 1.1rem 0.7rem;
    font-size: 0.98rem;
    border-radius: 10px;
    width: 94vw;
    margin-left: -47vw;
    min-width: 0;
  }
  .kfc-pay-imgs img {
    width: 44vw;
    max-width: 90vw;
  }
}
@keyframes kfc-error-pop {
  0% {
    transform: scale(0.7);
    opacity: 0;
  }
  60% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
}
@keyframes thursday-pop {
  0% {
    transform: scale(0.7);
    opacity: 0;
  }
  60% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.center-btn-group {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2.2rem 0 1.2rem 0;
  flex-wrap: wrap;
  gap: 0.8em;
}

.danmu-btn,
.msgboard-btn {
  position: static !important;
  margin-bottom: 0 !important;
  box-shadow: 0 2px 12px rgba(64, 158, 255, 0.18);
}

.msgboard-empty {
  color: #aaa;
  text-align: center;
  padding: 2em 0;
  font-size: 1.1em;
  letter-spacing: 1px;
}
.msgboard-item-outer {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 0.5em 0;
  background: none;
}
.msgboard-item {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(64, 158, 255, 0.07), 0 1.5px 6px rgba(0,0,0,0.03);
  padding: 1em 1.2em 0.7em 1.2em;
  margin: 0.2em 0;
  width: 98%;
  max-width: 700px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: box-shadow 0.2s;
  border: 1px solid #f0f0f0;
}
.msgboard-header {
  display: flex;
  align-items: center;
  gap: 0.7em;
  margin-bottom: 0.2em;
  width: 100%;
}
.msgboard-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  background: #eee;
  border: 1.5px solid #e0e0e0;
  flex-shrink: 0;
  box-shadow: 0 1px 4px rgba(64,158,255,0.09);
}
.msgboard-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 0.98em;
  color: #888;
  line-height: 1.2;
  gap: 2px;
}
.msgboard-loc {
  color: #409eff;
  font-size: 1em;
  font-weight: 500;
  margin-bottom: 1px;
}
.msgboard-time {
  color: #bbb;
  font-size: 0.93em;
}
.msgboard-content {
  font-size: 1.08em;
  word-break: break-word;
  margin: 0.3em 0 0.1em 0;
  color: #333;
  line-height: 1.7;
  width: 100%;
  text-align: left;
}
@media (max-width: 600px) {
  .el-dialog {
    width: 98vw !important;
    min-width: 0 !important;
    padding: 0 !important;
  }
  .msgboard-item {
    max-width: 98vw;
    padding: 0.8em 0.6em 0.6em 0.8em;
  }
  .msgboard-avatar {
    width: 32px;
    height: 32px;
  }
  .msgboard-content {
    font-size: 1em;
  }
}
</style>

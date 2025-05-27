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
      <transition name="fade">
        <div
          v-if="showKfcError || isThursday"
          class="kfc-error"
          @click="showKfcPay = true"
          style="cursor: pointer"
        >
          <span class="kfc-error-title">Exception Error!</span><br />
          <span class="kfc-error-msg"
            >Syntax Unexpected string: <b>KFC Crazy Thursday need 50 RMB</b></span
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
      <el-button type="primary" :icon="Operation">
        弹幕速度({{ getSpeedLabel(danmuSpeed) }})
      </el-button>
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
          <div v-if="msgList.length === 0" class="msgboard-empty">暂无留言</div>
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
// 1. 类型与逻辑全部外部引入
import { ref } from 'vue'
import { ChatLineRound, Operation } from '@element-plus/icons-vue'
import { useDanmu } from '@/composables/useDanmu'
import { useMsgBoard } from '@/composables/useMsgBoard'

// 2. 页面级状态
const isShaking = ref(false)
const showCat = ref(false)
const isSubtitleHover = ref(false)
const isThursday = new Date().getDay() === 4
const showKfcError = ref(false)
const showKfcPay = ref(false)

// 3. 弹幕逻辑
const {
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
} = useDanmu()

// 4. 留言板逻辑
const {
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
} = useMsgBoard()

// 5. 页面事件
function titleEasterEgg() {
  isShaking.value = true
  setTimeout(() => {
    isShaking.value = false
  }, 600)
}

// 6. 页面挂载与卸载
import { onMounted } from 'vue'
onMounted(() => {
  if (isThursday) showKfcError.value = false
  fetchDanmu()
  fetchMsgList()
})
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&display=swap');

.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 64px);
  color: #00ffe7;
  font-family: 'Orbitron', 'Segoe UI', Arial, sans-serif;
  text-align: center;
  transition: background 0.5s;
  position: relative;
  overflow: hidden;
  background: rgba(20,30,48,0.96);
}

.dynamic-bg {
  background: linear-gradient(
    120deg,
    #0a1a28 0%,
    #007cf0 40%,
    #00ffe7 100%
  );
  background-size: 200% 200%;
  animation: sci-gradient-move 16s ease-in-out infinite;
}

@keyframes sci-gradient-move {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.hero {
  background: rgba(10,20,40,0.92);
  border-radius: 24px;
  box-shadow: 0 0 32px #00ffe7a0, 0 0 12px #007cf0a0;
  border: 2px solid #00ffe7;
  padding: 3.5rem 2.5rem 2.5rem 2.5rem;
  margin: 0 auto;
  max-width: 600px;
  width: 98vw;
  position: relative;
  z-index: 2;

  h1 {
    font-size: 2.8rem;
    margin-bottom: 1.2rem;
    cursor: pointer;
    user-select: none;
    font-weight: 700;
    color: #00ffe7;
    text-shadow: 0 0 16px #00ffe7cc, 0 0 4px #007cf0a0;
    letter-spacing: 2px;
    transition: color 0.3s, text-shadow 0.3s;

    &.shake {
      animation: shake 0.6s;
      color: #fff;
      text-shadow:
        0 0 18px #00ffe7,
        0 0 32px #007cf0;
    }
  }

  .subtitle {
    font-size: 1.4rem;
    margin-bottom: 0.7rem;
    color: #00ffe7;
    cursor: pointer;
    transition: color 0.3s, background 0.3s;
    user-select: none;
    display: inline-block;
    padding: 0 0.7em;
    font-weight: 600;
    letter-spacing: 1px;
    text-shadow: 0 0 8px #00ffe7cc;

    &.gradient {
      background: linear-gradient(90deg, #00ffe7, #007cf0, #00ffe7);
      background-size: 200% 100%;
      background-position: left;
      color: transparent;
      -webkit-background-clip: text;
      background-clip: text;
      animation: sci-gradient-move 1.2s linear infinite;
      text-shadow: none;
    }
  }

  p {
    font-size: 1.15rem;
    margin-bottom: 2.2rem;
    color: #b0eaff;
    text-shadow: 0 0 6px #00ffe7a0;
  }
}

.center-btn-group {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2.2rem 0 1.2rem 0;
  flex-wrap: wrap;
  gap: 1.2em;
}

.danmu-btn,
.msgboard-btn {
  position: static !important;
  margin-bottom: 0 !important;
  background: linear-gradient(90deg, #00ffe7 0%, #007cf0 100%);
  color: #fff !important;
  border: none;
  border-radius: 12px;
  box-shadow: 0 0 16px #00ffe7a0;
  font-family: 'Orbitron', 'Segoe UI', Arial, sans-serif;
  font-weight: 600;
  letter-spacing: 1px;
  font-size: 1.08em;
  padding: 0.9em 2.2em;
  transition: background 0.2s, box-shadow 0.2s;
}

.danmu-btn:hover,
.msgboard-btn:hover {
  background: linear-gradient(90deg, #007cf0 0%, #00ffe7 100%);
  box-shadow: 0 0 28px #00ffe7cc;
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
  font-size: 1.18em;
  font-weight: bold;
  opacity: 1;
  animation: danmu-move linear;
  animation-fill-mode: forwards;
  pointer-events: none;
  letter-spacing: 1px;
  z-index: 20;
}
@keyframes danmu-move {
  0% {
    transform: translateX(100vw);
  }
  100% {
    transform: translateX(-100vw);
  }
}

.danmu-speed-btn {
  position: fixed;
  right: 18px;
  bottom: 30px;
  z-index: 1003;
}

:deep(.el-dropdown-menu__item.is-active) {
  background: #00ffe7 !important;
  color: #222 !important;
  font-weight: bold;
}

.kfc-error,
.kfc-translation,
.kfc-pay {
  /* 保持原有样式，或可略微调整为科技感 */
  background: rgba(10,20,40,0.98);
  border: 2.5px solid #00ffe7;
  color: #00ffe7;
  font-family: 'Orbitron', 'Segoe UI', Arial, sans-serif;
  box-shadow: 0 0 24px #00ffe7a0;
}

.kfc-error-title,
.kfc-translation-title,
.kfc-pay-title {
  color: #00ffe7 !important;
}

.kfc-error-msg,
.kfc-translation-msg {
  color: #b0eaff !important;
}

.kfc-pay-imgs img {
  border: 1.5px solid #00ffe7;
  box-shadow: 0 0 8px #00ffe7a0;
}

.msgboard-empty {
  color: #00ffe7;
  text-align: center;
  padding: 2em 0;
  font-size: 1.1em;
  letter-spacing: 1px;
  text-shadow: 0 0 8px #00ffe7a0;
}
.msgboard-item-outer {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 0.5em 0;
  background: none;
}
.msgboard-item {
  background: rgba(10,20,40,0.92);
  border-radius: 12px;
  box-shadow: 0 0 12px #00ffe7a0, 0 0 4px #007cf0a0;
  padding: 1em 1.2em 0.7em 1.2em;
  margin: 0.2em 0;
  width: 98%;
  max-width: 700px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: box-shadow 0.2s;
  border: 1.5px solid #00ffe7;
  color: #b0eaff;
  font-family: 'Orbitron', 'Segoe UI', Arial, sans-serif;
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
  background: #222;
  border: 1.5px solid #00ffe7;
  flex-shrink: 0;
  box-shadow: 0 1px 4px #00ffe7a0;
}
.msgboard-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 0.98em;
  color: #00ffe7;
  line-height: 1.2;
  gap: 2px;
}
.msgboard-loc {
  color: #00ffe7;
  font-size: 1em;
  font-weight: 500;
  margin-bottom: 1px;
}
.msgboard-time {
  color: #b0eaff;
  font-size: 0.93em;
}
.msgboard-content {
  font-size: 1.08em;
  word-break: break-word;
  margin: 0.3em 0 0.1em 0;
  color: #b0eaff;
  line-height: 1.7;
  width: 100%;
  text-align: left;
  font-family: 'Orbitron', 'Segoe UI', Arial, sans-serif;
}

/* 覆盖Element Plus弹窗为科技感风格，仅弹窗本身和控件，不动.msgboard-item等留言内容 */
:deep(.el-dialog) {
  background: rgba(10,20,40,0.96) !important;
  border-radius: 18px !important;
  border: 2px solid #00ffe7 !important;
  box-shadow: 0 0 32px #00ffe7a0, 0 0 12px #007cf0a0 !important;
  color: #b0eaff !important;
  font-family: 'Orbitron', 'Segoe UI', Arial, sans-serif !important;
  padding: 0 !important;
}
:deep(.el-dialog__header) {
  background: linear-gradient(90deg, #00ffe7 0%, #007cf0 100%) !important;
  color: #fff !important;
  font-family: 'Orbitron', 'Segoe UI', 'Arial', sans-serif !important;
  font-weight: bold !important;
  font-size: 1.15em !important;
  border-radius: 18px 18px 0 0 !important;
  box-shadow: 0 2px 8px #00ffe7a0 !important;
  padding: 1.2em 1.5em 1em 1.5em !important;
}
:deep(.el-dialog__title) {
  color: #fff !important;
  letter-spacing: 1px !important;
  text-shadow: 0 0 8px #00ffe7cc !important;
}
:deep(.el-dialog__body) {
  background: transparent !important;
  color: #b0eaff !important;
  padding: 1.5em 1.5em 1em 1.5em !important;
}
:deep(.el-dialog__footer) {
  background: transparent !important;
  border-top: 1px solid #00ffe733 !important;
  border-radius: 0 0 18px 18px !important;
  padding: 1em 1.5em 1.2em 1.5em !important;
}

/* 输入框、文本域、按钮科技感 */
:deep(.el-input__wrapper),
:deep(.el-input-number__wrapper),
:deep(.el-textarea__inner) {
  background: rgba(10,20,40,0.85) !important;
  border: 1.5px solid #007cf0 !important;
  border-radius: 10px !important;
  color: #b0eaff !important;
  box-shadow: 0 0 8px #00ffe7a0 !important;
  font-family: 'Orbitron', 'Segoe UI', Arial, sans-serif !important;
  transition: border 0.2s, box-shadow 0.2s;
}
:deep(.el-input__wrapper):focus-within,
:deep(.el-input-number__wrapper):focus-within,
:deep(.el-textarea__inner):focus {
  border-color: #00ffe7 !important;
  box-shadow: 0 0 16px #00ffe7cc !important;
}
:deep(.el-input__inner),
:deep(.el-textarea__inner) {
  color: #b0eaff !important;
  background: transparent !important;
  font-family: 'Orbitron', 'Segoe UI', Arial, sans-serif !important;
}
:deep(.el-radio-button__inner) {
  background: rgba(10,20,40,0.85) !important;
  border: 1.5px solid #007cf0 !important;
  color: #00ffe7 !important;
  font-family: 'Orbitron', 'Segoe UI', Arial, sans-serif !important;
  transition: border 0.2s, box-shadow 0.2s, background 0.2s, color 0.2s;
  box-shadow: 0 0 4px #00ffe7a0 !important;
  position: relative;
  z-index: 1;
}

/* 选中时高亮背景和描边，字体变白 */
:deep(.el-radio-button__orig-radio:checked + .el-radio-button__inner) {
  background: linear-gradient(90deg, #00ffe7 0%, #007cf0 100%) !important;
  color: #fff !important;
  border-color: #00ffe7 !important;
  box-shadow: 0 0 12px #00ffe7cc !important;
  font-weight: bold !important;
}

/* 给选中项加一个发光外环 */
:deep(.el-radio-button.is-checked .el-radio-button__inner) {
  box-shadow: 0 0 0 2px #00ffe7cc, 0 0 12px #00ffe7cc !important;
}

/* 选中项里的色块也变白色边框 */
:deep(.el-radio-button.is-checked .el-radio-button__inner span) {
  border: 1.5px solid #fff;
  border-radius: 2px;
  box-shadow: 0 0 4px #fff;
}

/* 色块span基础样式，未选中时无边框 */
:deep(.el-radio-button__inner span) {
  display: inline-block;
  font-size: 1.2em;
  border: none;
  border-radius: 2px;
  margin: 0 2px;
  transition: border 0.2s, box-shadow 0.2s;
}

/* 按钮组 */
.el-button-group {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
}

:deep(.el-scrollbar__bar) {
  background: #00ffe7a0 !important;
  border-radius: 4px;
}
:deep(.el-scrollbar__thumb) {
  background: #007cf0 !important;
  border-radius: 4px;
}

/* 弹窗内分割线 */
:deep(.el-divider) {
  border-color: #00ffe733 !important;
  background: #00ffe733 !important;
}

/* 弹窗内图片预览边框 */
:deep(.el-dialog) img {
  border: 1.5px solid #00ffe7 !important;
  box-shadow: 0 0 8px #00ffe7a0 !important;
}

/* 选中文字颜色 */
:deep(.el-input__inner)::selection,
:deep(.el-textarea__inner)::selection {
  background: #00ffe7 !important;
  color: #222 !important;
}

/* 兼容移动端弹窗宽度 */
@media (max-width: 600px) {
  :deep(.el-dialog) {
    width: 98vw !important;
    min-width: 0 !important;
    padding: 0 !important;
  }
}

@media (max-width: 600px) {
  .hero {
    padding: 1.2rem 0.5rem 1.2rem 0.5rem;
    max-width: 99vw;
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

@keyframes shake {
  10%, 90% { transform: translateX(-2px); }
  20%, 80% { transform: translateX(4px); }
  30%, 50%, 70% { transform: translateX(-8px); }
  40%, 60% { transform: translateX(8px); }
}
</style>

<template>
  <section class="tool-section">
    <h2>倒计时</h2>
    <div>
      <el-input v-model="input" placeholder="请输入目标时间(YYYY-MM-DD HH:mm:ss)" style="max-width:320px;" />
      <el-button @click="startCountdown" type="primary" style="margin-left:10px;">开始</el-button>
    </div>
    <div v-if="countdown !== null" class="countdown-result">
      剩余时间：{{ countdown }}
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

const input = ref('')
const countdown = ref<string | null>(null)
let timer: ReturnType<typeof setInterval> | null = null

function startCountdown() {
  if (timer) clearInterval(timer)
  updateCountdown()
  timer = setInterval(updateCountdown, 1000)
}

function updateCountdown() {
  const target = new Date(input.value)
  const now = new Date()
  const diff = target.getTime() - now.getTime()
  if (isNaN(target.getTime()) || diff < 0) {
    countdown.value = '已到达或格式错误'
    if (timer) clearInterval(timer)
    return
  }
  const d = Math.floor(diff / (1000 * 60 * 60 * 24))
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const m = Math.floor((diff / (1000 * 60)) % 60)
  const s = Math.floor((diff / 1000) % 60)
  countdown.value = `${d}天${h}小时${m}分${s}秒`
}

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.tool-section {
  max-width: 480px;
  margin: 0 auto;
  padding: 2rem 0;
}
.countdown-result {
  margin-top: 1.2em;
  font-size: 1.2em;
  color: #409eff;
}
</style>

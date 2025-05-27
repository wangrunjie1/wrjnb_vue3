<template>
  <section class="tool-section sci-card">
    <h2 class="sci-title">摸鱼倒计时</h2>
    <el-button @click="start" type="primary" class="sci-btn">开始摸鱼倒计时</el-button>
    <div v-if="left" class="fish-result sci-result">距离下班还有：{{ left }}</div>
  </section>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
const left = ref('')
let timer: ReturnType<typeof setInterval> | null = null
function start() {
  if (timer) clearInterval(timer)
  update()
  timer = setInterval(update, 1000)
}
function update() {
  const now = new Date()
  const end = new Date()
  end.setHours(18, 0, 0, 0)
  let diff = end.getTime() - now.getTime()
  if (diff < 0) diff = 0
  const h = Math.floor(diff / (1000 * 60 * 60))
  const m = Math.floor((diff / (1000 * 60)) % 60)
  const s = Math.floor((diff / 1000) % 60)
  left.value = `${h}小时${m}分${s}秒`
}
onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
@import './_sci-style.css';
.tool-section {
  max-width: 480px;
}
.fish-result {
  margin-top: 1.2em;
  font-size: 1.2em;
  color: #409eff;
}
</style>

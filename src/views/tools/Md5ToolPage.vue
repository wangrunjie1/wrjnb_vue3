<template>
  <div class="sci-card">
    <h2 class="sci-title">MD5加密工具</h2>
    <el-input v-model="input" type="textarea" :rows="4" placeholder="输入要加密的内容" class="sci-input" />
    <el-button type="primary" class="sci-btn" style="margin-top:1em;" @click="calcMd5">加密</el-button>
    <el-input v-model="output" readonly class="sci-input" style="margin-top:1em;" placeholder="MD5结果" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// 简单MD5实现，生产环境建议用crypto-js
function md5(str: string) {
  // 浏览器原生API
  return window.crypto.subtle.digest('MD5', new TextEncoder().encode(str)).then(buf =>
    Array.from(new Uint8Array(buf)).map(x => x.toString(16).padStart(2, '0')).join('')
  )
}
const input = ref('')
const output = ref('')
async function calcMd5() {
  if (!input.value) {
    output.value = ''
    return
  }
  output.value = await md5(input.value)
}
</script>
<style scoped>
@import './_sci-style.css';
</style>

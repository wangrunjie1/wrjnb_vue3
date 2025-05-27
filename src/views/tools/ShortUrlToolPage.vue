<template>
  <div class="sci-card">
    <h2 class="sci-title">短链生成</h2>
    <el-input v-model="url" placeholder="请输入长网址" class="sci-input" />
    <el-button type="primary" class="sci-btn" style="margin-top:1em;" @click="gen">生成短链</el-button>
    <el-input v-model="shortUrl" readonly class="sci-input" style="margin-top:1em;" placeholder="短链结果" />
    <el-alert v-if="error" type="error" :title="error" show-icon class="sci-alert" style="margin-top:1em;" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const url = ref('')
const shortUrl = ref('')
const error = ref('')
async function gen() {
  error.value = ''
  shortUrl.value = ''
  if (!/^https?:\/\//.test(url.value)) {
    error.value = '请输入有效网址'
    return
  }
  // 使用第三方API（如 https://suo.yt/api.php?url=...）
  try {
    const resp = await fetch(`https://suo.yt/api.php?url=${encodeURIComponent(url.value)}`)
    shortUrl.value = await resp.text()
  } catch {
    error.value = '生成失败'
  }
}
</script>
<style scoped>
@import './_sci-style.css';
</style>

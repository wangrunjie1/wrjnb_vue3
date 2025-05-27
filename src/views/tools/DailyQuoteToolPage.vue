<template>
  <section class="tool-section sci-card">
    <h2 class="sci-title">每日一言</h2>
    <el-button @click="fetchQuote" type="primary" class="sci-btn">获取一句话</el-button>
    <div v-if="quote" class="quote-result sci-result">{{ quote }}</div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const quote = ref('')
async function fetchQuote() {
  quote.value = '加载中...'
  try {
    const res = await fetch('https://v1.hitokoto.cn/?encode=text')
    quote.value = await res.text()
  } catch {
    quote.value = '获取失败'
  }
}
</script>

<style scoped>
@import './_sci-style.css';
</style>

<template>
  <section class="tool-section">
    <h2>每日一言</h2>
    <el-button @click="fetchQuote" type="primary">获取一句话</el-button>
    <div v-if="quote" class="quote-result">{{ quote }}</div>
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
.tool-section {
  max-width: 480px;
  margin: 0 auto;
  padding: 2rem 0;
}
.quote-result {
  margin-top: 1.2em;
  font-size: 1.2em;
  color: #409eff;
}
</style>

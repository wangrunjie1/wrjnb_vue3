<template>
  <section class="tool-section">
    <h2>诗词（示例）</h2>
    <el-button @click="getPoem" type="primary">随机诗词</el-button>
    <div v-if="poem" class="poem-result">{{ poem }}</div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const poem = ref('')
async function getPoem() {
  poem.value = '加载中...'
  try {
    const res = await fetch('https://v1.jinrishici.com/all.json')
    const data = await res.json()
    poem.value = `${data.content} —— ${data.author}《${data.origin}》`
  } catch {
    poem.value = '获取失败'
  }
}
</script>

<style scoped>
.tool-section {
  max-width: 480px;
  margin: 0 auto;
  padding: 2rem 0;
}
.poem-result {
  margin-top: 1.2em;
  font-size: 1.2em;
  color: #e6a23c;
}
</style>

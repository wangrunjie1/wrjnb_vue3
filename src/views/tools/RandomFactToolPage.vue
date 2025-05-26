<template>
  <section class="tool-section">
    <h2>冷知识</h2>
    <el-button @click="fetchFact" type="primary">获取冷知识</el-button>
    <div v-if="fact" class="fact-result">{{ fact }}</div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const fact = ref('')
async function fetchFact() {
  fact.value = '加载中...'
  try {
    const res = await fetch('https://uselessfacts.jsph.pl/random.json?language=zh')
    const data = await res.json()
    fact.value = data.text || '获取失败'
  } catch {
    fact.value = '获取失败'
  }
}
</script>

<style scoped>
.tool-section {
  max-width: 480px;
  margin: 0 auto;
  padding: 2rem 0;
}
.fact-result {
  margin-top: 1.2em;
  font-size: 1.2em;
  color: #e6a23c;
}
</style>

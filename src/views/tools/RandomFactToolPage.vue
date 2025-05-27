<template>
  <section class="tool-section sci-card">
    <h2 class="sci-title">冷知识</h2>
    <el-button @click="fetchFact" type="primary" class="sci-btn">获取冷知识</el-button>
    <div v-if="fact" class="fact-result sci-result">{{ fact }}</div>
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
@import './_sci-style.css';
</style>

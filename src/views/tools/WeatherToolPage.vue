<template>
  <section class="tool-section sci-card">
    <h2 class="sci-title">天气查询（示例）</h2>
    <div class="sci-form-row">
      <el-input v-model="city" placeholder="请输入城市名" class="sci-input" />
      <el-button @click="getWeather" type="primary" class="sci-btn">查询</el-button>
    </div>
    <div v-if="weather" class="weather-result sci-result">{{ weather }}</div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const city = ref('')
const weather = ref('')
async function getWeather() {
  if (!city.value) {
    weather.value = '请输入城市名'
    return
  }
  weather.value = '加载中...'
  // 这里只做演示，实际可接入你自己的天气API
  setTimeout(() => {
    weather.value = `${city.value}：晴，25℃`
  }, 1000)
}
</script>

<style scoped>
@import './_sci-style.css';
</style>

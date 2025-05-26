<template>
  <section class="tool-section">
    <h2>天气查询（示例）</h2>
    <el-input v-model="city" placeholder="请输入城市名" style="max-width:200px;" />
    <el-button @click="getWeather" type="primary" style="margin-left:10px;">查询</el-button>
    <div v-if="weather" class="weather-result">{{ weather }}</div>
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
.tool-section {
  max-width: 480px;
  margin: 0 auto;
  padding: 2rem 0;
}
.weather-result {
  margin-top: 1.2em;
  font-size: 1.2em;
  color: #67c23a;
}
</style>

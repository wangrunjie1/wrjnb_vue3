<template>
  <section class="tool-section sci-card">
    <h2 class="sci-title">今日幸运色</h2>
    <el-button @click="getColor" type="primary" class="sci-btn">抽取幸运色</el-button>
    <div v-if="color" class="color-result sci-result">
      <span class="color-dot" :style="{background: color}"></span>
      {{ color }}
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const color = ref('')
function getColor() {
  const colors = ['#FFB6C1', '#FFD700', '#7FFFD4', '#87CEFA', '#FFA07A', '#90EE90', '#FF69B4', '#20B2AA', '#FF6347', '#40E0D0']
  color.value = colors[Math.floor(Math.random() * colors.length)]
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&display=swap');
.tool-section.sci-card {
  max-width: 480px;
  margin: 2.5rem auto;
  padding: 2.5rem 2rem;
  background: rgba(20,30,48,0.92);
  border-radius: 20px;
  box-shadow: 0 0 32px #00ffe7a0, 0 0 12px #007cf0a0;
  border: 1.5px solid #00ffe7;
  font-family: 'Orbitron', 'Segoe UI', 'Arial', sans-serif;
}
.sci-title {
  color: #00ffe7;
  text-shadow: 0 0 8px #00ffe7cc;
  letter-spacing: 2px;
  margin-bottom: 1.5em;
  font-size: 1.5em;
  font-weight: 700;
}
.sci-btn {
  background: linear-gradient(90deg, #00ffe7 0%, #007cf0 100%);
  color: #fff;
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 12px #00ffe7a0;
  font-family: 'Orbitron', 'Segoe UI', 'Arial', sans-serif;
  font-weight: 600;
  letter-spacing: 1px;
  transition: background 0.2s, box-shadow 0.2s;
}
.sci-btn:hover {
  background: linear-gradient(90deg, #007cf0 0%, #00ffe7 100%);
  box-shadow: 0 0 24px #00ffe7cc;
}
.color-result.sci-result {
  margin-top: 2em;
  font-size: 1.2em;
  color: #00ffe7;
  text-shadow: 0 0 8px #00ffe7cc;
  letter-spacing: 1px;
  background: rgba(0,255,231,0.08);
  border-radius: 10px;
  padding: 0.8em 1em;
  box-shadow: 0 0 8px #00ffe755;
  display: flex;
  align-items: center;
  gap: 0.8em;
}
.color-dot {
  display: inline-block;
  width: 2em;
  height: 2em;
  border-radius: 50%;
  border: 2px solid #00ffe7;
  box-shadow: 0 0 8px #00ffe7a0;
}
</style>

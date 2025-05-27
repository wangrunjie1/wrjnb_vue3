<template>
  <section class="tool-section sci-card">
    <h2 class="sci-title">随机数生成</h2>
    <div class="sci-form-row">
      <el-input-number v-model="min" :min="0" :max="max" class="sci-input" />
      <span class="sci-span">至</span>
      <el-input-number v-model="max" :min="min" :max="999999" class="sci-input" />
      <el-button @click="generate" type="primary" class="sci-btn">生成</el-button>
    </div>
    <div v-if="result !== null" class="random-result sci-result">
      结果：{{ result }}
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const min = ref(1)
const max = ref(100)
const result = ref<number | null>(null)
function generate() {
  result.value = Math.floor(Math.random() * (max.value - min.value + 1)) + min.value
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
.sci-form-row {
  display: flex;
  align-items: center;
  gap: 1em;
}
.sci-input :deep(.el-input__wrapper), .sci-input :deep(.el-input-number__inner) {
  background: rgba(10,20,40,0.8);
  border: 1.5px solid #007cf0;
  border-radius: 10px;
  color: #b0eaff;
  box-shadow: 0 0 8px #00ffe7a0;
  transition: border 0.2s, box-shadow 0.2s;
}
.sci-span {
  color: #00ffe7;
  font-weight: bold;
  font-size: 1.1em;
  letter-spacing: 1px;
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
.random-result.sci-result {
  margin-top: 2em;
  font-size: 1.2em;
  color: #00ffe7;
  text-shadow: 0 0 8px #00ffe7cc;
  letter-spacing: 1px;
  background: rgba(0,255,231,0.08);
  border-radius: 10px;
  padding: 0.8em 1em;
  box-shadow: 0 0 8px #00ffe755;
}
</style>

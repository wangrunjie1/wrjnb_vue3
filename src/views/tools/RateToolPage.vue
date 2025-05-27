<template>
  <section class="tool-section sci-card">
    <h2 class="sci-title">汇率换算（示例）</h2>
    <div class="sci-form-row">
      <el-input-number v-model="cny" :min="0" class="sci-input" />
      <span class="sci-span">元 ≈</span>
      <span class="sci-result">{{ (cny * rate).toFixed(2) }}</span>
      <span class="sci-span">美元</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const cny = ref(100)
const rate = 0.14 // 示例汇率
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
.sci-input :deep(.el-input-number__inner) {
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
.sci-result {
  color: #00ffe7;
  font-weight: bold;
  font-size: 1.2em;
  text-shadow: 0 0 8px #00ffe7cc;
}
</style>

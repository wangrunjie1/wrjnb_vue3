<template>
  <section class="tool-section">
    <h2>汇率换算（示例）</h2>
    <el-input-number v-model="cny" :min="0" label="人民币" />
    <span style="margin:0 8px;">元 ≈</span>
    <span>{{ (cny * rate).toFixed(2) }}</span> 美元
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const cny = ref(100)
const rate = 0.14 // 示例汇率
</script>

<style scoped>
.tool-section {
  max-width: 480px;
  margin: 0 auto;
  padding: 2rem 0;
}
</style>

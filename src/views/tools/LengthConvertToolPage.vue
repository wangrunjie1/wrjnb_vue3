<template>
  <section class="tool-section">
    <h2>长度换算</h2>
    <el-input-number v-model="meter" :min="0" label="米" />
    <span style="margin:0 8px;">米 =</span>
    <span>{{ (meter * 100).toFixed(2) }}</span> 厘米
    <span style="margin:0 8px;">=</span>
    <span>{{ (meter * 1000).toFixed(2) }}</span> 毫米
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const meter = ref(1)
</script>

<style scoped>
.tool-section {
  max-width: 480px;
  margin: 0 auto;
  padding: 2rem 0;
}
</style>

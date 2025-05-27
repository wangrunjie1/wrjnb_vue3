<template>
  <section class="tool-section sci-card">
    <h2 class="sci-title">长度换算</h2>
    <div class="sci-form-row">
      <el-input-number v-model="meter" :min="0" class="sci-input" />
      <span class="sci-span">米 =</span>
      <span class="sci-result">{{ (meter * 100).toFixed(2) }}</span>
      <span class="sci-span">厘米 =</span>
      <span class="sci-result">{{ (meter * 1000).toFixed(2) }}</span>
      <span class="sci-span">毫米</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const meter = ref(1)
</script>

<style scoped>
@import './_sci-style.css';
</style>

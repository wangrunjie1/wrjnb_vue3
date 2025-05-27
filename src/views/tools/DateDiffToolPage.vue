<template>
  <section class="tool-section sci-card">
    <h2 class="sci-title">日期差计算</h2>
    <el-date-picker v-model="date1" type="date" placeholder="开始日期" class="sci-input" style="margin-right:10px;" />
    <el-date-picker v-model="date2" type="date" placeholder="结束日期" class="sci-input" />
    <el-button class="sci-btn" style="margin-left:10px;" @click="calc" type="primary">计算</el-button>
    <div v-if="result !== null" class="datediff-result sci-result">
      相差：{{ result }} 天
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const date1 = ref('')
const date2 = ref('')
const result = ref<number | null>(null)
function calc() {
  if (!date1.value || !date2.value) {
    result.value = null
    return
  }
  const d1 = new Date(date1.value)
  const d2 = new Date(date2.value)
  result.value = Math.abs(Math.floor((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)))
}
</script>

<style scoped>
@import './_sci-style.css';
</style>

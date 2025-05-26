<template>
  <section class="tool-section">
    <h2>日期差计算</h2>
    <el-date-picker v-model="date1" type="date" placeholder="开始日期" style="margin-right:10px;" />
    <el-date-picker v-model="date2" type="date" placeholder="结束日期" />
    <el-button @click="calc" type="primary" style="margin-left:10px;">计算</el-button>
    <div v-if="result !== null" class="datediff-result">
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
.tool-section {
  max-width: 480px;
  margin: 0 auto;
  padding: 2rem 0;
}
.datediff-result {
  margin-top: 1.2em;
  font-size: 1.2em;
  color: #e6a23c;
}
</style>

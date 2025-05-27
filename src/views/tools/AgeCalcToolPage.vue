<template>
  <div class="sci-card">
    <h2 class="sci-title">年龄计算器</h2>
    <el-date-picker v-model="birth" type="date" placeholder="选择出生日期" style="width: 100%" class="sci-input" />
    <el-button type="primary" class="sci-btn" style="margin-top: 1em" @click="calc">计算年龄</el-button>
    <el-alert
      v-if="age"
      :title="`年龄：${age} 岁`"
      type="success"
      show-icon
      class="sci-alert"
      style="margin-top: 1em"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const birth = ref('')
const age = ref('')
function calc() {
  if (!birth.value) return
  const b = new Date(birth.value)
  const now = new Date()
  let a = now.getFullYear() - b.getFullYear()
  if (
    now.getMonth() < b.getMonth() ||
    (now.getMonth() === b.getMonth() && now.getDate() < b.getDate())
  )
    a--
  age.value = a.toString()
}
</script>
<style scoped>
@import './_sci-style.css';
</style>

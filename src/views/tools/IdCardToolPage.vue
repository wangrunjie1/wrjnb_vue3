<template>
  <div class="sci-card">
    <h2 class="sci-title">身份证信息查询</h2>
    <el-input v-model="id" placeholder="输入18位身份证号" maxlength="18" class="sci-input" />
    <el-button type="primary" class="sci-btn" style="margin-top:1em;" @click="parseId">查询</el-button>
    <el-alert v-if="info" :title="info" type="success" show-icon class="sci-alert" style="margin-top:1em;" />
    <el-alert v-if="error" :title="error" type="error" show-icon class="sci-alert" style="margin-top:1em;" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const id = ref('')
const info = ref('')
const error = ref('')
function parseId() {
  error.value = ''
  info.value = ''
  if (!/^\d{17}[\dXx]$/.test(id.value)) {
    error.value = '身份证号格式错误'
    return
  }
  const birth = id.value.slice(6,14)
  const year = birth.slice(0,4)
  const month = birth.slice(4,6)
  const day = birth.slice(6,8)
  const gender = parseInt(id.value[16]) % 2 === 1 ? '男' : '女'
  info.value = `生日：${year}-${month}-${day}，性别：${gender}`
}
</script>

<style scoped>
@import './_sci-style.css';
</style>

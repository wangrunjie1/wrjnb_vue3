<template>
  <div class="sci-card">
    <h2 class="sci-title">JSON格式化美化工具</h2>
    <el-input v-model="input" type="textarea" :rows="10" placeholder="输入JSON字符串" class="sci-input" />
    <el-button type="primary" class="sci-btn" style="margin-top:1em;" @click="format">格式化</el-button>
    <el-input v-model="output" type="textarea" :rows="10" readonly class="sci-input" style="margin-top:1em;" placeholder="格式化结果" />
    <el-alert v-if="error" type="error" :title="error" show-icon class="sci-alert" style="margin-top:1em;" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const input = ref('')
const output = ref('')
const error = ref('')
function format() {
  error.value = ''
  try {
    output.value = JSON.stringify(JSON.parse(input.value), null, 2)
  } catch {
    error.value = 'JSON格式错误'
    output.value = ''
  }
}
</script>
<style scoped>
@import './_sci-style.css';
</style>

<template>
  <div style="max-width:700px;margin:auto;">
    <el-card>
      <h2>JSON格式化美化工具</h2>
      <el-input v-model="input" type="textarea" :rows="10" placeholder="输入JSON字符串" />
      <el-button type="primary" style="margin-top:1em;" @click="format">格式化</el-button>
      <el-input v-model="output" type="textarea" :rows="10" readonly style="margin-top:1em;" placeholder="格式化结果" />
      <el-alert v-if="error" type="error" :title="error" show-icon style="margin-top:1em;" />
    </el-card>
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

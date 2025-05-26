<template>
  <div style="max-width:500px;margin:auto;">
    <el-card>
      <h2>时间戳转换工具</h2>
      <el-form label-width="90px">
        <el-form-item label="时间戳">
          <el-input v-model="timestamp" placeholder="如 1680000000" />
        </el-form-item>
        <el-form-item>
          <el-button @click="toDate">转为日期</el-button>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker v-model="date" type="datetime" placeholder="选择日期时间" style="width:100%;" />
        </el-form-item>
        <el-form-item>
          <el-button @click="toTimestamp">转为时间戳</el-button>
        </el-form-item>
      </el-form>
      <el-alert v-if="result" :title="result" type="success" show-icon style="margin-top:1em;" />
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const timestamp = ref('')
const date = ref<number | null>(null)
const result = ref('')
function toDate() {
  const ts = Number(timestamp.value)
  if (!ts) {
    result.value = '请输入有效的时间戳'
    return
  }
  const d = new Date(ts.toString().length === 10 ? ts * 1000 : ts)
  date.value = d.getTime()
  result.value = '日期：' + d.toLocaleString()
}
function toTimestamp() {
  if (!date.value) {
    result.value = '请选择日期'
    return
  }
  result.value = '时间戳：' + Math.floor(date.value / 1000)
  timestamp.value = Math.floor(date.value / 1000).toString()
}
</script>

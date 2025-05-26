<template>
  <div style="max-width:500px;margin:auto;">
    <el-card>
      <h2>手机号归属地查询</h2>
      <el-input v-model="mobile" placeholder="输入手机号" maxlength="11" />
      <el-button type="primary" style="margin-top:1em;" @click="query">查询</el-button>
      <el-alert v-if="result" :title="result" type="success" show-icon style="margin-top:1em;" />
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const mobile = ref('')
const result = ref('')
async function query() {
  if (!/^1\d{10}$/.test(mobile.value)) {
    result.value = '手机号格式错误'
    return
  }
  // 使用第三方API，实际部署请替换为可用API
  const resp = await fetch(`https://api.vvhan.com/api/phone?phone=${mobile.value}`)
  const data = await resp.json()
  result.value = data.success
    ? `归属地：${data.result.province} ${data.result.city}，运营商：${data.result.company}`
    : '查询失败'
}
</script>

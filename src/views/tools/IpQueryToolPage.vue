<template>
  <div style="max-width:500px;margin:auto;">
    <el-card>
      <h2>IP归属地查询</h2>
      <el-input v-model="ip" placeholder="输入IP地址" />
      <el-button type="primary" style="margin-top:1em;" @click="query">查询</el-button>
      <el-alert v-if="result" :title="result" type="success" show-icon style="margin-top:1em;" />
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const ip = ref('')
const result = ref('')
async function query() {
  if (!ip.value) return
  // 使用第三方API，实际部署请替换为可用API
  const resp = await fetch(`https://ip-api.com/json/${ip.value}`)
  const data = await resp.json()
  result.value = data.status === 'success'
    ? `国家：${data.country}，地区：${data.regionName}，城市：${data.city}`
    : '查询失败'
}
</script>

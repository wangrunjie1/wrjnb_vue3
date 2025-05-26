<template>
  <div style="max-width:500px;margin:auto;">
    <el-card>
      <h2>UUID生成工具</h2>
      <el-input v-model="uuid" readonly style="margin-bottom:1em;" />
      <el-button type="primary" @click="generate">生成UUID</el-button>
      <el-button @click="copy" style="margin-left:1em;">复制</el-button>
      <el-alert v-if="msg" :title="msg" type="success" show-icon style="margin-top:1em;" />
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const uuid = ref('')
const msg = ref('')
function generate() {
  uuid.value = ('10000000-1000-4000-8000-100000000000').replace(/[018]/g, (c: string) =>
    (
      Number(c) ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & 15) >>
      (Number(c) / 4)
    ).toString(16)
  )
  msg.value = ''
}
function copy() {
  navigator.clipboard.writeText(uuid.value)
  msg.value = '已复制到剪贴板'
}
</script>

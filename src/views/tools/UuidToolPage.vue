<template>
  <div class="sci-card">
    <h2 class="sci-title">UUID生成工具</h2>
    <el-input v-model="uuid" readonly class="sci-input" style="margin-bottom:1em;" />
    <el-button type="primary" @click="generate" class="sci-btn">生成UUID</el-button>
    <el-button @click="copy" class="sci-btn" style="margin-left:1em;">复制</el-button>
    <el-alert v-if="msg" :title="msg" type="success" show-icon class="sci-alert" style="margin-top:1em;" />
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
<style scoped>
@import './_sci-style.css';
</style>

<template>
  <div class="sci-card">
    <h2 class="sci-title">UUID批量生成工具</h2>
    <el-input-number v-model="count" :min="1" :max="100" class="sci-input" style="width:120px;" />
    <el-button type="primary" class="sci-btn" style="margin-left:1em;" @click="generate">生成</el-button>
    <el-input v-model="uuids" type="textarea" :rows="8" readonly class="sci-input" style="margin-top:1em;" />
    <el-button class="sci-btn" style="margin-top:1em;" @click="copy">复制全部</el-button>
    <el-alert v-if="msg" :title="msg" type="success" show-icon class="sci-alert" style="margin-top:1em;" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const count = ref(10)
const uuids = ref('')
const msg = ref('')
function uuid() {
  return ('10000000-1000-4000-8000-100000000000').replace(/[018]/g, (c: string) =>
    (
      Number(c) ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & 15) >>
      (Number(c) / 4)
    ).toString(16)
  )
}
function generate() {
  uuids.value = Array.from({length: count.value}, uuid).join('\n')
  msg.value = ''
}
function copy() {
  navigator.clipboard.writeText(uuids.value)
  msg.value = '已复制到剪贴板'
}
</script>
<style scoped>
@import './_sci-style.css';
</style>

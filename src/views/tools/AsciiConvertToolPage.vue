<template>
  <div style="max-width:500px;margin:auto;">
    <el-card>
      <h2>ASCII码转换</h2>
      <el-input v-model="text" placeholder="输入字符或ASCII码（空格分隔）" />
      <el-button type="primary" style="margin-top:1em;" @click="toAscii">转ASCII</el-button>
      <el-button style="margin-top:1em;margin-left:1em;" @click="toChar">转字符</el-button>
      <el-input v-model="result" readonly style="margin-top:1em;" />
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const text = ref('')
const result = ref('')
function toAscii() {
  result.value = text.value.split('').map(c=>c.charCodeAt(0)).join(' ')
}
function toChar() {
  result.value = text.value.split(/\s+/).map(n=>String.fromCharCode(Number(n))).join('')
}
</script>

<template>
  <div class="sci-card">
    <h2 class="sci-title">ASCII码转换</h2>
    <el-input v-model="text" placeholder="输入字符或ASCII码（空格分隔）" class="sci-input" />
    <el-button type="primary" class="sci-btn" style="margin-top:1em;" @click="toAscii">转ASCII</el-button>
    <el-button class="sci-btn" style="margin-top:1em;margin-left:1em;" @click="toChar">转字符</el-button>
    <el-input v-model="result" readonly class="sci-input" style="margin-top:1em;" />
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
<style scoped>
@import './_sci-style.css';
</style>

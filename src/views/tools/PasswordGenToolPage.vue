<template>
  <div class="sci-card">
    <h2 class="sci-title">随机密码生成器</h2>
    <el-input-number v-model="len" :min="4" :max="32" class="sci-input" style="width:120px;" />
    <el-button type="primary" class="sci-btn" style="margin-left:1em;" @click="gen">生成</el-button>
    <el-input v-model="pwd" readonly class="sci-input" style="margin-top:1em;" />
    <el-button class="sci-btn" style="margin-top:1em;" @click="copy">复制</el-button>
    <el-alert v-if="msg" :title="msg" type="success" show-icon class="sci-alert" style="margin-top:1em;" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const len = ref(12)
const pwd = ref('')
const msg = ref('')
function gen() {
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678!@#$%^&*'
  pwd.value = Array.from({length: len.value}, () => chars[Math.floor(Math.random()*chars.length)]).join('')
  msg.value = ''
}
function copy() {
  navigator.clipboard.writeText(pwd.value)
  msg.value = '已复制到剪贴板'
}
</script>
<style scoped>
@import './_sci-style.css';
</style>

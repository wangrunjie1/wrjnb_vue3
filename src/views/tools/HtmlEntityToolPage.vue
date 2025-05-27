<template>
  <div class="sci-card">
    <h2 class="sci-title">HTML实体编码解码</h2>
    <el-input v-model="text" type="textarea" :rows="4" placeholder="输入内容" class="sci-input" />
    <el-button type="primary" class="sci-btn" style="margin-top:1em;" @click="encode">编码</el-button>
    <el-button class="sci-btn" style="margin-top:1em;margin-left:1em;" @click="decode">解码</el-button>
    <el-input v-model="result" type="textarea" :rows="4" readonly class="sci-input" style="margin-top:1em;" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const text = ref('')
const result = ref('')
function encode() {
  result.value = text.value.replace(/[\u00A0-\u9999<>&]/gim, c => '&#'+c.charCodeAt(0)+';')
}
function decode() {
  result.value = text.value.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
}
</script>
<style scoped>
@import './_sci-style.css';
</style>

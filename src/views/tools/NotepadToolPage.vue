<template>
  <div class="sci-card">
    <h2 class="sci-title">在线记事本</h2>
    <el-input v-model="text" type="textarea" :rows="12" placeholder="输入内容，自动本地保存" class="sci-input" />
    <el-alert type="info" title="内容会自动保存在本地浏览器" show-icon class="sci-alert" style="margin-top:1em;" />
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
const text = ref(localStorage.getItem('notepad') || '')
watch(text, v => localStorage.setItem('notepad', v))
</script>
<style scoped>
@import './_sci-style.css';
</style>

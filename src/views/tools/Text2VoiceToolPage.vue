<template>
  <div class="sci-card">
    <h2 class="sci-title">文字转语音</h2>
    <el-input v-model="text" type="textarea" :rows="4" placeholder="输入要朗读的文字" class="sci-input" />
    <el-button type="primary" class="sci-btn" style="margin-top:1em;" @click="speak">朗读</el-button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const text = ref('')
function speak() {
  if (!text.value) return
  const synth = window.speechSynthesis
  const utter = new window.SpeechSynthesisUtterance(text.value)
  synth.speak(utter)
}
</script>
<style scoped>
@import './_sci-style.css';
</style>

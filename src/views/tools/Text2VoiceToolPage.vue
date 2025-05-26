<template>
  <div style="max-width:500px;margin:auto;">
    <el-card>
      <h2>文字转语音</h2>
      <el-input v-model="text" type="textarea" :rows="4" placeholder="输入要朗读的文字" />
      <el-button type="primary" style="margin-top:1em;" @click="speak">朗读</el-button>
    </el-card>
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

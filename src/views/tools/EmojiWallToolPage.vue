<template>
  <section class="tool-section sci-card">
    <h2 class="sci-title">Emoji墙</h2>
    <el-input v-model="emoji" placeholder="输入emoji" class="sci-input" style="max-width:120px;" />
    <el-button @click="addEmoji" type="primary" class="sci-btn" style="margin-left:10px;">添加</el-button>
    <div class="emoji-wall sci-result">
      <span v-for="(e, i) in emojis" :key="i" class="emoji-item">{{ e }}</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const emoji = ref('')
const emojis = ref<string[]>([])
function addEmoji() {
  if (emoji.value.trim()) {
    emojis.value.push(emoji.value)
    emoji.value = ''
  }
}
</script>

<style scoped>
@import './_sci-style.css';
.emoji-wall {
  margin-top: 1.2em;
  font-size: 2em;
  min-height: 2em;
  word-break: break-all;
}
.emoji-item {
  margin-right: 0.2em;
}
</style>

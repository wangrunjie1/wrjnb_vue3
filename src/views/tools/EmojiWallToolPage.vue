<template>
  <section class="tool-section">
    <h2>Emoji墙</h2>
    <el-input v-model="emoji" placeholder="输入emoji" style="max-width:120px;" />
    <el-button @click="addEmoji" type="primary" style="margin-left:10px;">添加</el-button>
    <div class="emoji-wall">
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
.tool-section {
  max-width: 480px;
  margin: 0 auto;
  padding: 2rem 0;
}
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

<template>
  <section class="tool-section sci-card">
    <h2 class="sci-title">便签</h2>
    <el-input
      type="textarea"
      v-model="note"
      placeholder="输入你的便签内容"
      :rows="6"
      class="sci-input"
      style="max-width:400px;"
    />
    <el-button @click="save" type="primary" class="sci-btn" style="margin-top:10px;">保存</el-button>
    <div v-if="saved" class="note-saved sci-result">已保存！</div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const note = ref(localStorage.getItem('my_note') || '')
const saved = ref(false)
function save() {
  localStorage.setItem('my_note', note.value)
  saved.value = true
  setTimeout(() => (saved.value = false), 1200)
}
</script>

<style scoped>
@import './_sci-style.css';
</style>

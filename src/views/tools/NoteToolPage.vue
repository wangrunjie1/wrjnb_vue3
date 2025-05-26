<template>
  <section class="tool-section">
    <h2>便签</h2>
    <el-input
      type="textarea"
      v-model="note"
      placeholder="输入你的便签内容"
      :rows="6"
      style="max-width:400px;"
    />
    <el-button @click="save" type="primary" style="margin-top:10px;">保存</el-button>
    <div v-if="saved" class="note-saved">已保存！</div>
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
.tool-section {
  max-width: 480px;
  margin: 0 auto;
  padding: 2rem 0;
}
.note-saved {
  margin-top: 1em;
  color: #67c23a;
}
</style>

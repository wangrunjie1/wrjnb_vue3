<template>
  <div class="sci-card">
    <h2 class="sci-title">文本去重工具</h2>
    <el-input v-model="input" type="textarea" :rows="8" placeholder="每行一条，去重后输出" class="sci-input" />
    <el-button type="primary" class="sci-btn" style="margin-top:1em;" @click="dedup">去重</el-button>
    <el-input v-model="output" type="textarea" :rows="8" readonly class="sci-input" style="margin-top:1em;" placeholder="去重结果" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const input = ref('')
const output = ref('')
function dedup() {
  output.value = Array.from(new Set(input.value.split('\n'))).filter(x=>x.trim()).join('\n')
}
</script>
<style scoped>
@import './_sci-style.css';
</style>

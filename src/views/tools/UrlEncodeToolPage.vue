<template>
  <div class="sci-card">
    <h2 class="sci-title">URL编码解码工具</h2>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-input
          v-model="origin"
          type="textarea"
          :rows="6"
          placeholder="输入原始字符串"
          class="sci-input"
        />
        <el-button size="small" class="sci-btn" style="margin-top:0.5em;" @click="encode">编码 →</el-button>
      </el-col>
      <el-col :span="12">
        <el-input
          v-model="encoded"
          type="textarea"
          :rows="6"
          placeholder="URL编码字符串"
          class="sci-input"
        />
        <el-button size="small" class="sci-btn" style="margin-top:0.5em;" @click="decode">← 解码</el-button>
      </el-col>
    </el-row>
    <el-alert v-if="error" type="error" :title="error" show-icon class="sci-alert" style="margin-top:1em;" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const origin = ref('')
const encoded = ref('')
const error = ref('')
function encode() {
  error.value = ''
  try {
    encoded.value = encodeURIComponent(origin.value)
  } catch {
    error.value = '编码失败'
  }
}
function decode() {
  error.value = ''
  try {
    origin.value = decodeURIComponent(encoded.value)
  } catch {
    error.value = '解码失败'
  }
}
</script>
<style scoped>
@import './_sci-style.css';
</style>

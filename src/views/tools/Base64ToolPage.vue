<template>
  <div style="max-width: 700px; margin: auto">
    <el-card>
      <h2>Base64 编解码工具</h2>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input v-model="origin" type="textarea" :rows="8" placeholder="输入原始字符串" />
          <el-button size="small" style="margin-top: 0.5em" @click="encode">编码 →</el-button>
        </el-col>
        <el-col :span="12">
          <el-input v-model="base64" type="textarea" :rows="8" placeholder="Base64字符串" />
          <el-button size="small" style="margin-top: 0.5em" @click="decode">← 解码</el-button>
        </el-col>
      </el-row>
      <el-alert v-if="error" type="error" :title="error" show-icon style="margin-top: 1em" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const origin = ref('')
const base64 = ref('')
const error = ref('')

function encode() {
  error.value = ''
  try {
    base64.value = btoa(unescape(encodeURIComponent(origin.value)))
  } catch {
    error.value = '编码失败，内容可能包含无法编码的字符'
  }
}
function decode() {
  error.value = ''
  try {
    origin.value = decodeURIComponent(escape(atob(base64.value)))
  } catch {
    error.value = '解码失败，Base64格式不正确'
  }
}
</script>

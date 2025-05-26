<template>
  <div style="max-width:600px;margin:auto;">
    <el-card>
      <h2>文本去重工具</h2>
      <el-input v-model="input" type="textarea" :rows="8" placeholder="每行一条，去重后输出" />
      <el-button type="primary" style="margin-top:1em;" @click="dedup">去重</el-button>
      <el-input v-model="output" type="textarea" :rows="8" readonly style="margin-top:1em;" placeholder="去重结果" />
    </el-card>
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

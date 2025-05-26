<template>
  <div style="max-width:500px;margin:auto;">
    <el-card>
      <h2>亲戚称呼计算器</h2>
      <el-input v-model="relation" placeholder="如：爸爸的姐姐" />
      <el-button type="primary" style="margin-top:1em;" @click="calc">计算</el-button>
      <el-alert v-if="result" :title="result" type="success" show-icon style="margin-top:1em;" />
      <el-alert v-if="!result" type="info" title="仅支持常见称呼，如：爸爸的姐姐、妈妈的哥哥" show-icon style="margin-top:1em;" />
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const relation = ref('')
const result = ref('')
function calc() {
  // 简单实现，实际可用第三方库
  if (relation.value.includes('爸爸的姐姐')) result.value = '姑妈'
  else if (relation.value.includes('妈妈的哥哥')) result.value = '舅舅'
  else if (relation.value.includes('爸爸的哥哥')) result.value = '伯父'
  else if (relation.value.includes('爸爸的弟弟')) result.value = '叔叔'
  else if (relation.value.includes('妈妈的姐姐')) result.value = '姨妈'
  else result.value = '未识别，请输入常见称呼'
}
</script>

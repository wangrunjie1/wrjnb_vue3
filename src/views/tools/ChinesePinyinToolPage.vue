<template>
  <div style="max-width:600px;margin:auto;">
    <el-card>
      <h2>汉字转拼音</h2>
      <el-input v-model="text" type="textarea" :rows="4" placeholder="输入中文" />
      <el-button type="primary" style="margin-top:1em;" @click="toPinyin">转换</el-button>
      <el-input v-model="result" type="textarea" :rows="4" readonly style="margin-top:1em;" placeholder="拼音结果" />
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// 新增：引入 pinyin-pro
import { pinyin } from 'pinyin-pro'

const text = ref('')
const result = ref('')
function toPinyin() {
  result.value = pinyin(text.value, { toneType: 'none', type: 'array' }).join(' ')
}
</script>

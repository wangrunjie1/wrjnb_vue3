<template>
  <div class="sci-card">
    <h2 class="sci-title">汉字转拼音</h2>
    <el-input v-model="text" type="textarea" :rows="4" placeholder="输入中文" class="sci-input" />
    <el-button type="primary" class="sci-btn" style="margin-top:1em;" @click="toPinyin">转换</el-button>
    <el-input v-model="result" type="textarea" :rows="4" readonly class="sci-input" style="margin-top:1em;" placeholder="拼音结果" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { pinyin } from 'pinyin-pro'

const text = ref('')
const result = ref('')
function toPinyin() {
  result.value = pinyin(text.value, { toneType: 'none', type: 'array' }).join(' ')
}
</script>
<style scoped>
@import './_sci-style.css';
</style>

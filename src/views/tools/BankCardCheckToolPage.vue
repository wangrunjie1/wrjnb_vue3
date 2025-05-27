<template>
  <div class="sci-card">
    <h2 class="sci-title">银行卡校验码计算</h2>
    <el-input v-model="card" maxlength="19" placeholder="输入银行卡号" class="sci-input" />
    <el-button type="primary" class="sci-btn" style="margin-top:1em;" @click="calc">计算</el-button>
    <el-input v-model="result" readonly class="sci-input" style="margin-top:1em;" placeholder="校验码" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const card = ref('')
const result = ref('')
function calc() {
  if (!/^\d+$/.test(card.value)) {
    result.value = '格式错误'
    return
  }
  const arr = card.value.split('').reverse().map(Number)
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    let n = arr[i]
    if (i % 2 === 1) {
      n *= 2
      if (n > 9) n -= 9
    }
    sum += n
  }
  result.value = (10 - sum % 10) % 10 + ''
}
</script>
<style scoped>
@import './_sci-style.css';
</style>

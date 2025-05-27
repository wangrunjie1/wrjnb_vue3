<template>
  <div class="sci-card">
    <h2 class="sci-title">身份证校验码计算</h2>
    <el-input v-model="id17" maxlength="17" placeholder="输入前17位身份证号" class="sci-input" />
    <el-button type="primary" class="sci-btn" style="margin-top:1em;" @click="calc">计算</el-button>
    <el-input v-model="result" readonly class="sci-input" style="margin-top:1em;" placeholder="校验码" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const id17 = ref('')
const result = ref('')
function calc() {
  if (!/^\d{17}$/.test(id17.value)) {
    result.value = '格式错误'
    return
  }
  const w = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  const v = ['1','0','X','9','8','7','6','5','4','3','2']
  let sum = 0
  for (let i = 0; i < 17; i++) sum += Number(id17.value[i]) * w[i]
  result.value = v[sum % 11]
}
</script>
<style scoped>
@import './_sci-style.css';
</style>

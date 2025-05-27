<template>
  <div class="sci-card">
    <h2 class="sci-title">小费计算器</h2>
    <el-form label-width="80px">
      <el-form-item label="消费金额">
        <el-input-number v-model="amount" :min="0" class="sci-input" />
      </el-form-item>
      <el-form-item label="小费比例(%)">
        <el-input-number v-model="percent" :min="0" :max="100" class="sci-input" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="sci-btn" @click="calc">计算</el-button>
      </el-form-item>
    </el-form>
    <el-alert v-if="result" :title="result" type="success" show-icon class="sci-alert" style="margin-top:1em;" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const amount = ref(0)
const percent = ref(10)
const result = ref('')
function calc() {
  if (!amount.value || !percent.value) return
  const tip = amount.value * percent.value / 100
  result.value = `小费：${tip.toFixed(2)}，总计：${(amount.value + tip).toFixed(2)}`
}
</script>
<style scoped>
@import './_sci-style.css';
</style>

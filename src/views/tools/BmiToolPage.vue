<template>
  <div class="sci-card">
    <h2 class="sci-title">BMI计算器</h2>
    <el-form label-width="80px">
      <el-form-item label="身高(cm)">
        <el-input-number v-model="height" :min="50" :max="250" class="sci-input" />
      </el-form-item>
      <el-form-item label="体重(kg)">
        <el-input-number v-model="weight" :min="10" :max="200" class="sci-input" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="sci-btn" @click="calc">计算</el-button>
      </el-form-item>
    </el-form>
    <el-alert v-if="result" :title="result" type="success" show-icon class="sci-alert" style="margin-top: 1em" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const height = ref(170)
const weight = ref(60)
const result = ref('')
function calc() {
  if (!height.value || !weight.value) return
  const bmi = weight.value / Math.pow(height.value / 100, 2)
  let level = ''
  if (bmi < 18.5) level = '偏瘦'
  else if (bmi < 24) level = '正常'
  else if (bmi < 28) level = '超重'
  else level = '肥胖'
  result.value = `BMI：${bmi.toFixed(2)}，${level}`
}
</script>
<style scoped>
@import './_sci-style.css';
</style>

<template>
  <div style="max-width:600px;margin:auto;">
    <el-card>
      <h2>进制转换工具</h2>
      <el-form label-width="80px">
        <el-form-item label="原数值">
          <el-input v-model="input" placeholder="如 1010" />
        </el-form-item>
        <el-form-item label="原进制">
          <el-select v-model="from" style="width:100px;">
            <el-option label="2" :value="2" />
            <el-option label="8" :value="8" />
            <el-option label="10" :value="10" />
            <el-option label="16" :value="16" />
          </el-select>
        </el-form-item>
        <el-form-item label="目标进制">
          <el-select v-model="to" style="width:100px;">
            <el-option label="2" :value="2" />
            <el-option label="8" :value="8" />
            <el-option label="10" :value="10" />
            <el-option label="16" :value="16" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="convert">转换</el-button>
        </el-form-item>
      </el-form>
      <el-alert v-if="result" :title="result" type="success" show-icon style="margin-top:1em;" />
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const input = ref('')
const from = ref(10)
const to = ref(2)
const result = ref('')
function convert() {
  try {
    const num = parseInt(input.value, from.value)
    if (isNaN(num)) {
      result.value = '输入格式错误'
      return
    }
    result.value = `结果：${num.toString(to.value)}`
  } catch {
    result.value = '转换失败'
  }
}
</script>

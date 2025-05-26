<template>
  <section class="tool-section">
    <h2>随机数生成</h2>
    <div>
      <el-input-number v-model="min" :min="0" :max="max" label="最小值" />
      <span style="margin:0 8px;">至</span>
      <el-input-number v-model="max" :min="min" :max="999999" label="最大值" />
      <el-button @click="generate" type="primary" style="margin-left:10px;">生成</el-button>
    </div>
    <div v-if="result !== null" class="random-result">
      结果：{{ result }}
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const min = ref(1)
const max = ref(100)
const result = ref<number | null>(null)
function generate() {
  result.value = Math.floor(Math.random() * (max.value - min.value + 1)) + min.value
}
</script>

<style scoped>
.tool-section {
  max-width: 480px;
  margin: 0 auto;
  padding: 2rem 0;
}
.random-result {
  margin-top: 1.2em;
  font-size: 1.2em;
  color: #67c23a;
}
</style>

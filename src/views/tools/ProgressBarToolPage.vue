<template>
  <div class="sci-card">
    <h2 class="sci-title">进度条生成器</h2>
    <el-slider v-model="percent" :min="0" :max="100" />
    <el-progress :percentage="percent" style="margin-top:1em;" />
    <el-input v-model="percent" type="number" :min="0" :max="100" class="sci-input" style="margin-top:1em;" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const percent = ref(50)
</script>
<style scoped>
@import './_sci-style.css';
</style>

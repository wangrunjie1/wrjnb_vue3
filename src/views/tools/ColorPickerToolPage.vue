<template>
  <div class="sci-card">
    <h2 class="sci-title">颜色取色器</h2>
    <input type="color" v-model="color" style="width: 100%; height: 60px; border: none" />
    <el-input v-model="color" class="sci-input" style="margin-top: 1em" />
    <div
      :style="{ background: color, height: '40px', margin: '1em 0', borderRadius: '6px' }"
    ></div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const color = ref('#409eff')
</script>
<style scoped>
@import './_sci-style.css';
</style>

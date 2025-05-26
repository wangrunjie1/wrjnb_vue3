<template>
  <div style="max-width:500px;margin:auto;">
    <el-card>
      <h2>进度条生成器</h2>
      <el-slider v-model="percent" :min="0" :max="100" />
      <el-progress :percentage="percent" style="margin-top:1em;" />
      <el-input v-model="percent" type="number" :min="0" :max="100" style="margin-top:1em;" />
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const percent = ref(50)
</script>

<template>
  <section class="tool-section">
    <h2>今日幸运色</h2>
    <el-button @click="getColor" type="primary">抽取幸运色</el-button>
    <div v-if="color" class="color-result">
      <span :style="{background: color, display:'inline-block', width:'2em', height:'2em', borderRadius:'50%', verticalAlign:'middle', marginRight:'0.5em'}"></span>
      {{ color }}
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const color = ref('')
function getColor() {
  const colors = ['#FFB6C1', '#FFD700', '#7FFFD4', '#87CEFA', '#FFA07A', '#90EE90', '#FF69B4', '#20B2AA', '#FF6347', '#40E0D0']
  color.value = colors[Math.floor(Math.random() * colors.length)]
}
</script>

<style scoped>
.tool-section {
  max-width: 480px;
  margin: 0 auto;
  padding: 2rem 0;
}
.color-result {
  margin-top: 1.2em;
  font-size: 1.2em;
}
</style>

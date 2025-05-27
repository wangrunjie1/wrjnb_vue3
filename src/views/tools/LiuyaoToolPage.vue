<template>
  <section class="tool-section sci-card">
    <h2 class="sci-title">六爻工具</h2>
    <el-button @click="cast" type="primary" class="sci-btn">起卦</el-button>
    <div v-if="yaos.length" class="liuyao-result sci-result">
      <div v-for="(yao, idx) in yaos" :key="idx" class="yao-line">
        <span>{{ 6 - idx }}. </span>
        <span :class="yao === '阳爻' ? 'yao-yang' : 'yao-yin'">{{ yao }}</span>
      </div>
      <div class="liuyao-tip">自下而上为初爻至上爻</div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const yaos = ref<string[]>([])
function cast() {
  yaos.value = []
  for (let i = 0; i < 6; i++) {
    yaos.value.unshift(Math.random() > 0.5 ? '阳爻' : '阴爻')
  }
}
</script>

<style scoped>
@import './_sci-style.css';
.liuyao-result {
  margin-top: 1.5em;
  font-size: 1.2em;
}
.yao-line {
  margin: 0.2em 0;
}
.yao-yang {
  color: #00ffe7;
  font-weight: bold;
}
.yao-yin {
  color: #e6a23c;
  font-weight: bold;
}
.liuyao-tip {
  margin-top: 1em;
  font-size: 0.95em;
  color: #888;
}
</style>

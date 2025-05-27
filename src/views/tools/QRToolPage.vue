<template>
  <section class="tool-section sci-card">
    <h2 class="sci-title">二维码生成</h2>
    <el-input v-model="text" placeholder="请输入内容" class="sci-input" style="max-width:320px;" />
    <div v-if="text" class="qr-result sci-result">
      <qrcode-vue :value="text" :size="180" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import QrcodeVue from 'qrcode.vue'
const text = ref('')
</script>

<style scoped>
@import './_sci-style.css';
.qr-result {
  margin-top: 1.5em;
  text-align: center;
}
</style>

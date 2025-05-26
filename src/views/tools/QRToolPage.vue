<template>
  <section class="tool-section">
    <h2>二维码生成</h2>
    <el-input v-model="text" placeholder="请输入内容" style="max-width:320px;" />
    <div v-if="text" class="qr-result">
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
.tool-section {
  max-width: 480px;
  margin: 0 auto;
  padding: 2rem 0;
}
.qr-result {
  margin-top: 1.5em;
  text-align: center;
}
</style>

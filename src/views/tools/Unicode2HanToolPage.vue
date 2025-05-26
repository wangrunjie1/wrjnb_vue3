<template>
  <div style="max-width:500px;margin:auto;">
    <el-card>
      <h2>Unicode转汉字</h2>
      <el-input v-model="unicode" type="textarea" :rows="4" placeholder="输入Unicode编码，如\u4e2d\u6587" />
      <el-button type="primary" style="margin-top:1em;" @click="convert">转换</el-button>
      <el-input v-model="han" type="textarea" :rows="4" readonly style="margin-top:1em;" placeholder="汉字" />
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const unicode = ref('')
const han = ref('')
function convert() {
  try {
    han.value = unicode.value.replace(/\\u([\dA-Fa-f]{4})/g, (_, g) => String.fromCharCode(parseInt(g, 16)))
  } catch {
    han.value = '格式错误'
  }
}
</script>

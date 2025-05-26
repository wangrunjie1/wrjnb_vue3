<template>
  <div style="max-width:500px;margin:auto;">
    <el-card>
      <h2>汉字转Unicode</h2>
      <el-input v-model="han" type="textarea" :rows="4" placeholder="输入汉字" />
      <el-button type="primary" style="margin-top:1em;" @click="convert">转换</el-button>
      <el-input v-model="unicode" type="textarea" :rows="4" readonly style="margin-top:1em;" placeholder="Unicode编码" />
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const han = ref('')
const unicode = ref('')
function convert() {
  unicode.value = han.value.split('').map(c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0')).join('')
}
</script>

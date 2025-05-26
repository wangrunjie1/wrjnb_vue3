<template>
  <div style="max-width:500px;margin:auto;">
    <el-card>
      <h2>图片转Base64</h2>
      <input type="file" @change="onFileChange" accept="image/*" />
      <el-input v-model="base64" type="textarea" :rows="6" readonly style="margin-top:1em;" placeholder="Base64结果" />
      <img v-if="base64" :src="base64" style="max-width:100%;margin-top:1em;" />
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const base64 = ref('')
function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => { base64.value = reader.result as string }
  reader.readAsDataURL(file)
}
</script>

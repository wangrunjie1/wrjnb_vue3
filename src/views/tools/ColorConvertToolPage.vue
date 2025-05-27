<template>
  <div class="sci-card">
    <h2 class="sci-title">RGB/HEX颜色转换</h2>
    <el-form label-width="80px">
      <el-form-item label="HEX">
        <el-input v-model="hex" placeholder="#RRGGBB" @input="hexToRgb" class="sci-input" />
      </el-form-item>
      <el-form-item label="RGB">
        <el-input v-model="rgb" placeholder="rgb(255,255,255)" @input="rgbToHex" class="sci-input" />
      </el-form-item>
    </el-form>
    <div
      v-if="color"
      :style="{ background: color, height: '40px', margin: '1em 0', borderRadius: '6px' }"
    ></div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const hex = ref('')
const rgb = ref('')
const color = ref('')
function hexToRgb() {
  let h = hex.value.trim().replace(/^#/, '')
  if (h.length === 3)
    h = h
      .split('')
      .map((x) => x + x)
      .join('')
  if (h.length !== 6) return
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  rgb.value = `rgb(${r},${g},${b})`
  color.value = `#${h}`
}
function rgbToHex() {
  const m = rgb.value.match(/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/)
  if (!m) return
  const h = [1, 2, 3].map((i) => parseInt(m[i]).toString(16).padStart(2, '0')).join('')
  hex.value = `#${h}`
  color.value = `#${h}`
}
</script>
<style scoped>
@import './_sci-style.css';
</style>

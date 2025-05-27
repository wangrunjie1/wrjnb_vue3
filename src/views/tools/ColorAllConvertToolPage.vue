<template>
  <div class="sci-card">
    <h2 class="sci-title">颜色进制转换</h2>
    <el-input v-model="hex" placeholder="#RRGGBB" @input="hexToRgbHsl" class="sci-input" />
    <el-input
      v-model="rgb"
      placeholder="rgb(255,255,255)"
      @input="rgbToHexHsl"
      class="sci-input"
      style="margin-top: 1em"
    />
    <el-input
      v-model="hsl"
      placeholder="hsl(0,0%,100%)"
      @input="hslToHexRgb"
      class="sci-input"
      style="margin-top: 1em"
    />
    <div :style="{ background: hex, height: '40px', margin: '1em 0', borderRadius: '6px' }"></div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const hex = ref('#ffffff')
const rgb = ref('rgb(255,255,255)')
const hsl = ref('hsl(0,0%,100%)')
function hexToRgbHsl() {
  let h = hex.value.replace(/^#/, '')
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
  // RGB转HSL
  const [r1, g1, b1] = [r, g, b].map((x) => x / 255)
  const max = Math.max(r1, g1, b1),
    min = Math.min(r1, g1, b1)
  let h2 = 0,
    s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r1:
        h2 = (g1 - b1) / d + (g1 < b1 ? 6 : 0)
        break
      case g1:
        h2 = (b1 - r1) / d + 2
        break
      case b1:
        h2 = (r1 - g1) / d + 4
        break
    }
    h2 /= 6
  }
  hsl.value = `hsl(${Math.round(h2 * 360)},${Math.round(s * 100)}%,${Math.round(l * 100)}%)`
}
function rgbToHexHsl() {
  const m = rgb.value.match(/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/)
  if (!m) return
  const [r, g, b] = [1, 2, 3].map((i) => parseInt(m[i]))
  hex.value = `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`
  hexToRgbHsl()
}
function hslToHexRgb() {
  const m = hsl.value.match(/^hsl\((\d+),\s*(\d+)%?,\s*(\d+)%?\)$/)
  if (!m) return
  const [h, s, l] = [parseInt(m[1]), parseInt(m[2]) / 100, parseInt(m[3]) / 100]
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m1 = l - c / 2
  let [r, g, b] = [0, 0, 0]
  if (h < 60) [r, g, b] = [c, x, 0]
  else if (h < 120) [r, g, b] = [x, c, 0]
  else if (h < 180) [r, g, b] = [0, c, x]
  else if (h < 240) [r, g, b] = [0, x, c]
  else if (h < 300) [r, g, b] = [x, 0, c]
  else [r, g, b] = [c, 0, x]
  r = Math.round((r + m1) * 255)
  g = Math.round((g + m1) * 255)
  b = Math.round((b + m1) * 255)
  rgb.value = `rgb(${r},${g},${b})`
  hex.value = `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`
}
</script>
<style scoped>
@import './_sci-style.css';
</style>

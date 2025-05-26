<template>
  <!-- 只写页面内容，不要有 <router-view /> -->
  <div style="max-width:500px;margin:auto;">
    <el-card>
      <h2>金额大写转换</h2>
      <el-input v-model="num" placeholder="请输入金额" />
      <el-button type="primary" style="margin-top:1em;" @click="convert">转换</el-button>
      <el-input v-model="result" readonly style="margin-top:1em;" placeholder="大写金额" />
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const num = ref('')
const result = ref('')
function convert() {
  const n = Number(num.value)
  if (isNaN(n)) {
    result.value = '请输入有效数字'
    return
  }
  const fraction = ['角', '分']
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']]
  let head = n < 0 ? '负' : ''
  let s = ''
  let numAbs = Math.abs(n)
  for (let i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(numAbs * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
  }
  s = s || '整'
  numAbs = Math.floor(numAbs)
  for (let i = 0; i < unit[0].length && numAbs > 0; i++) {
    let p = ''
    for (let j = 0; j < unit[1].length && numAbs > 0; j++) {
      p = digit[numAbs % 10] + unit[1][j] + p
      numAbs = Math.floor(numAbs / 10)
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
  }
  s = head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整')
  result.value = s
}
</script>

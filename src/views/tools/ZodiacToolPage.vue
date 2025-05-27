<template>
  <div class="sci-card">
    <h2 class="sci-title">生肖/星座查询</h2>
    <el-date-picker v-model="date" type="date" placeholder="选择日期" style="width:100%;" class="sci-input" />
    <el-button type="primary" class="sci-btn" style="margin-top:1em;" @click="calc">查询</el-button>
    <el-alert v-if="result" :title="result" type="success" show-icon class="sci-alert" style="margin-top:1em;" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const date = ref('')
const result = ref('')
function calc() {
  if (!date.value) return
  const d = new Date(date.value)
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  const zodiacArr = ['猴','鸡','狗','猪','鼠','牛','虎','兔','龙','蛇','马','羊']
  const constellationArr: [string, number, number][] = [
    ['摩羯座',1,20],['水瓶座',2,19],['双鱼座',3,21],['白羊座',4,20],['金牛座',5,21],['双子座',6,22],
    ['巨蟹座',7,23],['狮子座',8,23],['处女座',9,23],['天秤座',10,24],['天蝎座',11,23],['射手座',12,22],['摩羯座',12,31]
  ]
  const zodiac = zodiacArr[year % 12]
  let constellation: string = ''
  for (let i = 0; i < constellationArr.length; i++) {
    const [name, m, d2] = constellationArr[i]
    const [, nextM, nextD] = constellationArr[i+1] || []
    if ((month === m && day >= d2) ||
        (month === nextM && day < nextD)) {
      constellation = name
      break
    }
  }
  result.value = `生肖：${zodiac}，星座：${constellation}`
}
</script>
<style scoped>
@import './_sci-style.css';
</style>

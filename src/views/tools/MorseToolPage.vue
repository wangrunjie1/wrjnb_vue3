<template>
  <div style="max-width:500px;margin:auto;">
    <el-card>
      <h2>摩斯电码转换</h2>
      <el-input v-model="text" placeholder="输入英文或摩斯码（空格分隔）" />
      <el-button type="primary" style="margin-top:1em;" @click="toMorse">转摩斯</el-button>
      <el-button style="margin-top:1em;margin-left:1em;" @click="toText">转英文</el-button>
      <el-input v-model="result" readonly style="margin-top:1em;" />
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const morseMap: Record<string, string> = {
  A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--..',
  '1':'.----','2':'..---','3':'...--','4':'....-','5':'.....','6':'-....','7':'--...','8':'---..','9':'----.','0':'-----'
}
const text = ref('')
const result = ref('')
function toMorse() {
  result.value = text.value.toUpperCase().split('').map(c => morseMap[c] || c).join(' ')
}
function toText() {
  const rev = Object.fromEntries(Object.entries(morseMap).map(([k,v])=>[v,k]))
  result.value = text.value.split(' ').map(m=>rev[m]||m).join('')
}
</script>

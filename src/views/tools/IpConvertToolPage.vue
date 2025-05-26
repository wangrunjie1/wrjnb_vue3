<template>
  <div style="max-width: 500px; margin: auto">
    <el-card>
      <h2>IP地址进制转换</h2>
      <el-input v-model="ip" placeholder="输入IPv4地址，如192.168.1.1" />
      <el-button type="primary" style="margin-top: 1em" @click="toInt">转整数</el-button>
      <el-input v-model="intIp" readonly style="margin-top: 1em" placeholder="整数" />
      <el-input v-model="intVal" placeholder="输入整数" style="margin-top: 1em" />
      <el-button style="margin-top: 1em" @click="toIp">转IP</el-button>
      <el-input v-model="ip2" readonly style="margin-top: 1em" placeholder="IP地址" />
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const ip = ref('')
const intIp = ref('')
const intVal = ref('')
const ip2 = ref('')
function toInt() {
  intIp.value = ip.value
    .split('.')
    .reduce((acc, cur) => (acc << 8) + Number(cur), 0)
    .toString()
}
function toIp() {
  const n = Number(intVal.value)
  ip2.value = [24, 16, 8, 0].map((i) => String((n >> i) & 255)).join('.')
}
</script>

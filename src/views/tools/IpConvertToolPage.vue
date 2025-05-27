<template>
  <div class="sci-card">
    <h2 class="sci-title">IP地址进制转换</h2>
    <el-input v-model="ip" placeholder="输入IPv4地址，如192.168.1.1" class="sci-input" />
    <el-button type="primary" class="sci-btn" style="margin-top: 1em" @click="toInt">转整数</el-button>
    <el-input v-model="intIp" readonly class="sci-input" style="margin-top: 1em" placeholder="整数" />
    <el-input v-model="intVal" placeholder="输入整数" class="sci-input" style="margin-top: 1em" />
    <el-button class="sci-btn" style="margin-top: 1em" @click="toIp">转IP</el-button>
    <el-input v-model="ip2" readonly class="sci-input" style="margin-top: 1em" placeholder="IP地址" />
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
<style scoped>
@import './_sci-style.css';
</style>

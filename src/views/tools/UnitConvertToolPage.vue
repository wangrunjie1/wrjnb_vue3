<template>
  <div class="sci-card">
    <h2 class="sci-title">单位换算工具</h2>
    <el-form label-width="80px">
      <el-form-item label="数值">
        <el-input v-model.number="value" class="sci-input" />
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="type" style="width:120px;">
          <el-option label="米-千米" value="m-km" />
          <el-option label="千克-克" value="kg-g" />
          <el-option label="厘米-米" value="cm-m" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="sci-btn" @click="convert">换算</el-button>
      </el-form-item>
    </el-form>
    <el-alert v-if="result" :title="result" type="success" show-icon class="sci-alert" style="margin-top:1em;" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const value = ref(0)
const type = ref('m-km')
const result = ref('')
function convert() {
  if (type.value === 'm-km') result.value = `${value.value} 米 = ${value.value/1000} 千米`
  else if (type.value === 'kg-g') result.value = `${value.value} 千克 = ${value.value*1000} 克`
  else if (type.value === 'cm-m') result.value = `${value.value} 厘米 = ${value.value/100} 米`
}
</script>
<style scoped>
@import './_sci-style.css';
</style>

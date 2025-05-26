<template>
  <div style="max-width:600px;margin:auto;">
    <el-card>
      <h2>字符串长度统计工具</h2>
      <el-input
        v-model="text"
        type="textarea"
        :rows="6"
        placeholder="输入要统计的字符串"
      />
      <div style="margin-top:1em;">
        <el-tag>字符数：{{ text.length }}</el-tag>
        <el-tag style="margin-left:1em;">字节数：{{ byteLen }}</el-tag>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
const text = ref('')
const byteLen = computed(() => new Blob([text.value]).size)
</script>

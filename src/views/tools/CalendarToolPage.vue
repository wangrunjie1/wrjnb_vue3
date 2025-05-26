<template>
  <div style="max-width: 400px; margin: auto">
    <el-card>
      <h2>万年历</h2>
      <el-date-picker v-model="date" type="date" style="width: 100%" />
      <div v-if="date" style="margin-top: 1em">
        <el-alert :title="`公历：${dateStr}`" type="success" show-icon />
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
const date = ref('')
const dateStr = computed(() => (date.value ? new Date(date.value).toLocaleDateString() : ''))
</script>

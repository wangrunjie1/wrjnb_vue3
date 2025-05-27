<template>
  <div class="sci-card">
    <h2 class="sci-title">万年历</h2>
    <el-date-picker v-model="date" type="date" style="width: 100%" class="sci-input" />
    <div v-if="date" style="margin-top: 1em">
      <el-alert :title="`公历：${dateStr}`" type="success" show-icon class="sci-alert" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
const date = ref('')
const dateStr = computed(() => (date.value ? new Date(date.value).toLocaleDateString() : ''))
</script>
<style scoped>
@import './_sci-style.css';
</style>

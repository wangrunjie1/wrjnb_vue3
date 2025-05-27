<template>
  <div class="sci-card">
    <h2 class="sci-title">记账本</h2>
    <el-form inline>
      <el-form-item label="金额">
        <el-input-number v-model="amount" :min="0" class="sci-input" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="desc" class="sci-input" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="sci-btn" @click="add">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" class="sci-table" style="margin-top: 1em">
      <el-table-column prop="date" label="日期" width="120" />
      <el-table-column prop="amount" label="金额" width="100" />
      <el-table-column prop="desc" label="备注" />
    </el-table>
    <div style="margin-top: 1em; text-align: right">
      <el-tag>总计：{{ total }}</el-tag>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
const amount = ref(0)
const desc = ref('')
const list = ref<{ date: string; amount: number; desc: string }[]>([])
function add() {
  if (!amount.value) return
  list.value.push({ date: new Date().toLocaleDateString(), amount: amount.value, desc: desc.value })
  amount.value = 0
  desc.value = ''
}
const total = computed(() => list.value.reduce((sum, item) => sum + item.amount, 0))
</script>
<style scoped>
@import './_sci-style.css';
</style>

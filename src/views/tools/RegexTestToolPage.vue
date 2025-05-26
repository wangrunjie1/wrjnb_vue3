<template>
  <div style="max-width:700px;margin:auto;">
    <el-card>
      <h2>正则表达式测试工具</h2>
      <el-form label-width="100px">
        <el-form-item label="正则表达式">
          <el-input v-model="pattern" placeholder="如：^\\d{3,}$" />
        </el-form-item>
        <el-form-item label="修饰符">
          <el-input v-model="flags" placeholder="如：gi" style="width:120px;" />
        </el-form-item>
        <el-form-item label="测试文本">
          <el-input
            v-model="testText"
            type="textarea"
            :rows="6"
            placeholder="输入要测试的文本"
          />
        </el-form-item>
      </el-form>
      <el-alert v-if="error" type="error" :title="error" show-icon style="margin-bottom:1em;" />
      <div v-if="matches !== null">
        <h4>匹配结果：</h4>
        <div v-if="matches.length">
          <el-tag
            v-for="(m, i) in matches"
            :key="i"
            type="success"
            style="margin:0.2em;"
          >{{ m }}</el-tag>
        </div>
        <div v-else style="color:#888;">无匹配</div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const pattern = ref('')
const flags = ref('')
const testText = ref('')
const matches = ref<string[] | null>(null)
const error = ref('')

watch([pattern, flags, testText], () => {
  error.value = ''
  matches.value = null
  if (!pattern.value) return
  try {
    const reg = new RegExp(pattern.value, flags.value)
    const result = [...testText.value.matchAll(reg)].map(m => m[0])
    matches.value = result
  } catch (e: any) {
    error.value = '正则表达式错误：' + e.message
  }
})
</script>

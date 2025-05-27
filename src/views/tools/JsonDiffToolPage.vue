<template>
  <div class="sci-card">
    <h2 class="sci-title">JSON对比工具</h2>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-input
          v-model="json1"
          type="textarea"
          :rows="16"
          placeholder="输入第一个JSON"
          class="sci-input"
        />
        <el-button size="small" style="margin-top:0.5em;" @click="formatJson(1)" class="sci-btn">格式化</el-button>
      </el-col>
      <el-col :span="12">
        <el-input
          v-model="json2"
          type="textarea"
          :rows="16"
          placeholder="输入第二个JSON"
          class="sci-input"
        />
        <el-button size="small" style="margin-top:0.5em;" @click="formatJson(2)" class="sci-btn">格式化</el-button>
      </el-col>
    </el-row>
    <el-button type="primary" style="margin-top:1em;" @click="compareJson" class="sci-btn">对比</el-button>
    <el-alert v-if="error" type="error" :title="error" show-icon class="sci-alert" style="margin-top:1em;" />
    <div v-if="diffResult" style="margin-top:1em;">
      <h4>对比结果：</h4>
      <pre
        v-html="diffResult"
        style="background:#101c2c;padding:1em;border-radius:6px;overflow:auto;color:#b0eaff;"
      ></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const json1 = ref('')
const json2 = ref('')
const diffResult = ref('')
const error = ref('')

function syntaxHighlight(json: string) {
  // 简单高亮
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|\d+)/g, function (match) {
    let cls = 'number'
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'key'
      } else {
        cls = 'string'
      }
    } else if (/true|false/.test(match)) {
      cls = 'boolean'
    } else if (/null/.test(match)) {
      cls = 'null'
    }
    return `<span class="${cls}">${match}</span>`
  })
}

function compareJson() {
  error.value = ''
  diffResult.value = ''
  let obj1, obj2
  try {
    obj1 = JSON.parse(json1.value)
  } catch {
    error.value = '第一个JSON格式错误'
    return
  }
  try {
    obj2 = JSON.parse(json2.value)
  } catch {
    error.value = '第二个JSON格式错误'
    return
  }
  // 简单diff：只显示字符串化后的差异
  const str1 = JSON.stringify(obj1, null, 2)
  const str2 = JSON.stringify(obj2, null, 2)
  if (str1 === str2) {
    diffResult.value = '<span style="color:green;">两个JSON完全一致</span>'
    return
  }
  // 行级diff
  const lines1 = str1.split('\n')
  const lines2 = str2.split('\n')
  let html = ''
  const maxLen = Math.max(lines1.length, lines2.length)
  for (let i = 0; i < maxLen; i++) {
    const l1 = lines1[i] || ''
    const l2 = lines2[i] || ''
    if (l1 === l2) {
      html += `<div><span style="color:#888;">${syntaxHighlight(l1)}</span></div>`
    } else {
      if (l1) html += `<div style="background:#ffecec;"><span style="color:#d32f2f;">${syntaxHighlight(l1)}</span></div>`
      if (l2) html += `<div style="background:#e8f5e9;"><span style="color:#388e3c;">${syntaxHighlight(l2)}</span></div>`
    }
  }
  diffResult.value = html
}

function formatJson(which: 1 | 2) {
  try {
    if (which === 1) {
      if (!json1.value.trim()) return
      json1.value = JSON.stringify(JSON.parse(json1.value), null, 2)
    } else {
      if (!json2.value.trim()) return
      json2.value = JSON.stringify(JSON.parse(json2.value), null, 2)
    }
    error.value = ''
  } catch {
    error.value = which === 1 ? '第一个JSON格式错误，无法格式化' : '第二个JSON格式错误，无法格式化'
  }
}
</script>

<style scoped>
@import './_sci-style.css';
pre {
  font-family: 'Fira Mono', 'Consolas', 'Menlo', monospace;
  font-size: 1em;
}
.string { color: #00ffe7; }
.number { color: #1976d2; }
.boolean { color: #d32f2f; }
.null { color: #bdbdbd; }
.key { color: #795548; }
</style>

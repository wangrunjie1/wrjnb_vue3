<template>
  <div style="max-width:500px;margin:auto;">
    <el-card>
      <h2>抖音视频下载</h2>
      <el-form @submit.prevent="handleDownload">
        <el-form-item label="抖音分享链接">
          <el-input v-model="shareUrl" placeholder="粘贴抖音分享链接"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="handleDownload">解析并下载</el-button>
        </el-form-item>
      </el-form>
      <div v-if="videoUrl" style="margin-top:1em;">
        <video :src="videoUrl" controls style="width:100%;"></video>
        <el-button type="success" style="margin-top:1em;" :href="videoUrl" download target="_blank">下载无水印视频</el-button>
      </div>
      <el-alert v-if="error" type="error" :title="error" show-icon style="margin-top:1em;" />
      <el-alert
        v-if="!error && !videoUrl"
        type="info"
        title="请粘贴抖音分享链接，点击解析"
        show-icon
        style="margin-top:1em;"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const shareUrl = ref('')
const videoUrl = ref('')
const loading = ref(false)
const error = ref('')

async function handleDownload() {
  error.value = ''
  videoUrl.value = ''
  if (!shareUrl.value.trim()) {
    error.value = '请输入抖音分享链接'
    return
  }
  loading.value = true
  try {
    // 这里使用第三方API（如 https://api.douyin.wtf/api?url=...）
    const api = 'https://api.douyin.wtf/api'
    const resp = await fetch(`${api}?url=${encodeURIComponent(shareUrl.value.trim())}`)
    const data = await resp.json()
    if (data && data.video && data.video.no_watermark) {
      videoUrl.value = data.video.no_watermark
    } else {
      error.value = '解析失败，请检查链接或稍后再试'
    }
  } catch (e) {
    error.value = '解析失败，网络或API异常'
  }
  loading.value = false
}
</script>

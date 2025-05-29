<template>
  <div class="sci-card" style="max-width:600px;margin:2em auto;">
    <h2 class="sci-title">发布文章</h2>
    <el-form :model="form" label-width="80px" @submit.prevent="onSubmit">
      <el-form-item label="标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="摘要">
        <el-input v-model="form.summary" />
      </el-form-item>
      <el-form-item label="封面">
        <el-input v-model="form.cover" placeholder="图片URL" />
      </el-form-item>
      <el-form-item label="正文">
        <el-input type="textarea" v-model="form.content" :rows="8" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="loading">发布</el-button>
        <el-button @click="$router.back()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { createArticle } from '@/api/blog'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const form = ref({ title: '', summary: '', cover: '', content: '' })
const loading = ref(false)
const router = useRouter()

async function onSubmit() {
  if (!form.value.title || !form.value.content) {
    ElMessage.warning('请填写标题和正文')
    return
  }
  loading.value = true
  try {
    const res = await createArticle(form.value)
    if (res.data.code === 0) {
      ElMessage.success('发布成功')
      router.push(`/blog/article/${res.data.data.id}`)
    } else {
      ElMessage.error(res.data.msg)
    }
  } catch {
    ElMessage.error('发布失败')
  }
  loading.value = false
}
</script>

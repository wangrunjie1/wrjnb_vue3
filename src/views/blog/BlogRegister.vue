<template>
  <div class="blog-card" style="max-width:400px;margin:2em auto;">
    <h2 class="blog-title">注册</h2>
    <el-form :model="form" @submit.prevent="onRegister">
      <el-form-item label="用户名">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onRegister" :loading="loading" class="blog-btn">注册</el-button>
        <el-button @click="$router.push('/blog/login')" type="text" class="blog-btn">已有账号？登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import '@/assets/blog-theme.css'
import { ref } from 'vue'
import { register } from '@/api/blog'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const form = ref({ username: '', email: '', phone: '', password: '' })
const loading = ref(false)
const router = useRouter()

async function onRegister() {
  if (!form.value.username || !form.value.email || !form.value.password) {
    ElMessage.warning('请填写完整信息')
    return
  }
  loading.value = true
  try {
    const res = await register(form.value)
    if (res.data.code === 0) {
      ElMessage.success('注册成功，请登录')
      router.push('/blog/login')
    } else {
      ElMessage.error(res.data.msg)
    }
  } catch {
    ElMessage.error('注册失败')
  }
  loading.value = false
}
</script>

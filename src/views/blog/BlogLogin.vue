<template>
  <div class="blog-card" style="max-width:400px;margin:2em auto;">
    <h2 class="blog-title">登录</h2>
    <el-form :model="form" @submit.prevent="onLogin">
      <el-form-item label="用户名/邮箱">
        <el-input v-model="form.username" autocomplete="username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" autocomplete="current-password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onLogin" :loading="loading" class="blog-btn">登录</el-button>
        <el-button @click="$router.push('/blog/register')" type="text" class="blog-btn">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import '@/assets/blog-theme.css'
import { ref } from 'vue'
import { login } from '@/api/blog'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const form = ref({ username: '', password: '' })
const loading = ref(false)
const userStore = useUserStore()
const router = useRouter()

async function onLogin() {
  if (!form.value.username || !form.value.password) {
    ElMessage.warning('请输入用户名和密码')
    return
  }
  loading.value = true
  try {
    const res = await login(form.value)
    if (res.data.code === 0) {
      userStore.setToken(res.data.data.token)
      await userStore.fetchUser()
      ElMessage.success('登录成功')
      router.push('/blog')
    } else {
      ElMessage.error(res.data.msg)
    }
  } catch {
    ElMessage.error('登录失败')
  }
  loading.value = false
}
</script>

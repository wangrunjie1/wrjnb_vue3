<template>
  <nav class="nav-container">
    <div class="nav-content">
      <div class="logo">
        <router-link to="/">
          <img src="@/assets/images/logo.jpg" alt="" />
        </router-link>
      </div>
      <div class="nav-links">
        <router-link to="/" class="nav-item">首页</router-link>
        <router-link to="/Tools" class="nav-item">实用工具箱</router-link>
        <router-link to="/blog" class="nav-item">文章</router-link>
        <!-- 其他导航项 -->
      </div>
      <div class="nav-user">
        <template v-if="user">
          <el-dropdown trigger="hover" @command="handleUserMenu">
            <span class="user-info">
              <img :src="user.avatar || defaultAvatar" class="user-avatar" />
              <span class="user-name">{{ user.username }}</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
        <template v-else>
          <el-button type="primary" class="login-btn" @click="goLogin">登录/注册</el-button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const user = computed(() => userStore.user)
const router = useRouter()
const defaultAvatar = 'https://api.multiavatar.com/placeholder.png'

function goLogin() {
  router.push('/blog/login')
}
function handleUserMenu(cmd: string) {
  if (cmd === 'logout') {
    userStore.logout()
    router.replace('/')
  }
}
</script>

<style scoped lang="scss">
.nav-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  .logo {
    width: 50px;
    height: 50px;
    img {
      width: 50px;
      height: 50px;
    }
  }
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-item {
  text-decoration: none;
  color: #333;
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 4px;
}

.nav-item:hover {
  background-color: #f5f5f5;
}
</style>

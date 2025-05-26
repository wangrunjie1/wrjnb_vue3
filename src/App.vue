<template>
  <div class="app-container">
    <NavigationBar />
    <main class="main-content" :class="{ home: isHome }">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import NavigationBar from './components/layout/NavigationBar.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const isHome = ref(false)
const route = useRoute()

onMounted(() => {
  isHome.value = route.path === '/'
})
</script>

<style scoped lang="scss">
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.app-container {
  min-height: 100vh;
}

.main-content {
  padding-top: 60px; /* 与导航栏高度相同 */
  padding: 20px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  /* 首页通栏特殊处理 */
  &.home {
    max-width: none;
    padding: 0;
    padding-top: 60px;
  }
}

/* 全局样式变量 */
:root {
  --primary-color: #409eff;
  --text-color: #333333;
  --background-color: #f5f5f5;
}

/* 全局基础样式 */
h1,
h2,
h3,
h4,
h5,
h6 {
  color: var(--text-color);
  margin-bottom: 1rem;
}

.card {
  background: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
</style>

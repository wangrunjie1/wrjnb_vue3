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
        <!-- 其他导航项 -->
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
// 组件逻辑
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&display=swap');

.nav-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: rgba(20, 30, 48, 0.96);
  box-shadow: 0 0 24px #00ffe7a0, 0 0 8px #007cf0a0;
  border-bottom: 2px solid #00ffe7;
  z-index: 1000;
  font-family: 'Orbitron', 'Segoe UI', 'Arial', sans-serif;
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  .logo {
    width: 54px;
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    border: 2px solid #00ffe7;
    box-shadow: 0 0 16px #00ffe7a0, 0 0 4px #007cf0a0;
    background: rgba(10, 20, 40, 0.85);
    transition: box-shadow 0.2s;
    img {
      width: 44px;
      height: 44px;
      border-radius: 8px;
      box-shadow: 0 0 8px #00ffe7a0;
    }
    &:hover {
      box-shadow: 0 0 32px #00ffe7cc, 0 0 12px #007cf0cc;
    }
  }
}

.nav-links {
  display: flex;
  gap: 28px;
}

.nav-item {
  text-decoration: none;
  color: #00ffe7;
  font-size: 1.08em;
  font-family: 'Orbitron', 'Segoe UI', 'Arial', sans-serif;
  padding: 7px 22px;
  border-radius: 10px;
  font-weight: 600;
  letter-spacing: 1px;
  background: linear-gradient(90deg, #00ffe7 0%, #007cf0 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  border: 1.5px solid #00ffe7;
  box-shadow: 0 0 8px #00ffe7a0;
  transition:
    background 0.2s,
    box-shadow 0.2s,
    border-color 0.2s,
    -webkit-text-fill-color 0.2s;
  position: relative;
  overflow: hidden;
}

.nav-item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, #007cf0 0%, #00ffe7 100%);
  opacity: 0;
  z-index: 0;
  transition: opacity 0.2s;
  border-radius: 10px;
}

.nav-item:hover {
  color: #fff;
  -webkit-text-fill-color: #fff;
  background: linear-gradient(90deg, #007cf0 0%, #00ffe7 100%);
  box-shadow: 0 0 16px #00ffe7cc;
  border-color: #007cf0;
}

.nav-item:hover::before {
  opacity: 0.18;
}
</style>

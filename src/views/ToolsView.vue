<template>
  <div class="tools-root tools-layout">
    <!-- PC端侧边栏 -->
    <aside v-if="!isMobile" class="tools-sidebar">
      <el-menu
        :default-active="activeCategory"
        class="tools-menu"
        @select="handleCategorySelect"
        router
      >
        <template v-for="group in menuGroups" :key="group.index">
          <el-sub-menu :index="group.index">
            <template #title>{{ group.title }}</template>
            <el-menu-item v-for="item in group.items" :key="item.index" :index="item.index">{{
              item.title
            }}</el-menu-item>
          </el-sub-menu>
        </template>
      </el-menu>
    </aside>
    <!-- 手机端右上角菜单按钮 -->
    <div v-if="isMobile" class="mobile-nav-btn">
      <el-button
        circle
        @click="drawerVisible = true"
        class="mobile-nav-btn-inner"
        style="background: #409eff; color: #fff; box-shadow: 0 2px 12px rgba(64, 158, 255, 0.18)"
      >
        <svg width="26" height="26" viewBox="0 0 1024 1024" fill="currentColor">
          <rect x="192" y="256" width="640" height="80" rx="40" />
          <rect x="192" y="472" width="640" height="80" rx="40" />
          <rect x="192" y="688" width="640" height="80" rx="40" />
        </svg>
      </el-button>
    </div>
    <!-- 手机端抽屉导航 -->
    <el-drawer
      v-model="drawerVisible"
      direction="rtl"
      size="70vw"
      :with-header="false"
      class="mobile-drawer"
    >
      <el-menu
        :default-active="activeCategory"
        class="tools-menu"
        @select="handleDrawerSelect"
        router
      >
        <template v-for="group in menuGroups" :key="group.index">
          <el-sub-menu :index="group.index">
            <template #title>{{ group.title }}</template>
            <el-menu-item v-for="item in group.items" :key="item.index" :index="item.index">{{
              item.title
            }}</el-menu-item>
          </el-sub-menu>
        </template>
      </el-menu>
    </el-drawer>
    <main class="tools-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
// 1. 逻辑与菜单数据全部抽离到 composable
import { useToolsMenu } from '@/composables/useToolsMenu'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()

// 2. 菜单与移动端逻辑
const { menuGroups, isMobile, drawerVisible, handleCategorySelect, handleDrawerSelect } =
  useToolsMenu(router)

// 3. 当前激活菜单
const activeCategory = computed(() => route.path)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&display=swap');

.tools-root {
  background: linear-gradient(135deg, #0f2027 0%, #2c5364 100%);
  min-height: 100vh;
  font-family: 'Orbitron', 'Segoe UI', 'Arial', sans-serif;
  backdrop-filter: blur(24px) saturate(180%);
  box-shadow: 0 0 80px 0 rgba(0,255,255,0.08) inset;
}

.tools-layout {
  display: flex;
  height: calc(100vh - 60px);
  min-height: 0;
  position: relative;
  box-shadow: 0 0 40px 0 rgba(0,255,255,0.10) inset;
}

.tools-sidebar {
  width: 240px;
  background: rgba(20, 30, 48, 0.92);
  border-right: 2px solid #00ffe7;
  padding-top: 2.5rem;
  height: calc(100vh - 60px);
  min-height: 0;
  z-index: 2;
  overflow-y: auto;
  box-shadow: 4px 0 24px 0 #00ffe7a0;
  border-radius: 0 24px 24px 0;
}

.tools-menu {
  border-right: none;
  background: transparent;
  --el-menu-bg-color: transparent;
  --el-menu-text-color: #b0eaff;
  --el-menu-active-color: #00ffe7;
  --el-menu-hover-bg-color: rgba(0,255,231,0.08);
  --el-menu-item-height: 48px;
  font-size: 1.08rem;
  font-family: 'Orbitron', 'Segoe UI', 'Arial', sans-serif;
}

.el-menu-item, .el-sub-menu__title {
  transition: color 0.2s, background 0.2s, box-shadow 0.2s;
  border-radius: 8px;
  margin: 2px 8px;
  box-shadow: 0 0 0 transparent;
}
.el-menu-item:hover, .el-sub-menu__title:hover {
  color: #fff;
  background: linear-gradient(90deg, #00ffe7 0%, #007cf0 100%);
  box-shadow: 0 0 12px #00ffe7a0, 0 0 4px #007cf0a0;
}
.el-menu-item.is-active {
  color: #fff !important;
  background: linear-gradient(90deg, #00ffe7 0%, #007cf0 100%) !important;
  box-shadow: 0 0 16px #00ffe7cc, 0 0 8px #007cf0cc;
  border: 1.5px solid #00ffe7;
}

.tools-content {
  flex: 1;
  padding: 2.5rem 2vw 2.5rem 2vw;
  min-width: 0;
  height: calc(100vh - 60px);
  overflow-y: auto;
  background: rgba(10, 20, 40, 0.7);
  border-radius: 24px;
  margin: 1.5rem 1.5rem 1.5rem 0;
  box-shadow: 0 0 32px 0 #00ffe7a0 inset, 0 0 24px 0 #007cf0a0;
  border: 1.5px solid #00ffe733;
}

.mobile-nav-btn {
  position: fixed;
  top: 18px;
  right: 18px;
  z-index: 1002;
  .mobile-nav-btn-inner {
    width: 54px;
    height: 54px;
    border-radius: 50%;
    background: linear-gradient(135deg, #00ffe7 0%, #007cf0 100%);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    font-size: 32px;
    box-shadow: 0 0 24px #00ffe7a0, 0 0 8px #007cf0a0;
    transition: background 0.2s, box-shadow 0.2s;
    outline: 2px solid #00ffe755;
  }
  .mobile-nav-btn-inner:hover {
    background: linear-gradient(135deg, #007cf0 0%, #00ffe7 100%);
    box-shadow: 0 0 32px #00ffe7cc, 0 0 16px #007cf0cc;
  }
  svg {
    display: block;
    margin: auto;
    filter: drop-shadow(0 0 6px #00ffe7cc);
  }
}

.mobile-drawer {
  z-index: 1003;
  background: rgba(20, 30, 48, 0.98);
  box-shadow: -8px 0 32px #00ffe7a0;
  border-left: 2px solid #00ffe7;
  .el-menu {
    background: transparent;
  }
}

.el-drawer__body {
  padding: 0 !important;
}

@media (max-width: 900px) {
  .tools-layout {
    flex-direction: column;
    min-height: 0;
    background: none;
    box-shadow: none;
  }
  .tools-sidebar {
    display: none;
    height: auto;
  }
  .tools-content {
    padding: 1.2rem 0.5rem;
    overflow-y: visible;
    margin: 1rem 0.5rem;
    border-radius: 18px;
  }
  .mobile-drawer {
    height: 100vh !important;
    max-height: 100vh;
    border-radius: 24px 0 0 24px;
  }
}

::-webkit-scrollbar {
  width: 8px;
  background: #1a2a3a;
}
::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #00ffe7 0%, #007cf0 100%);
  border-radius: 8px;
  box-shadow: 0 0 8px #00ffe7a0;
}
</style>

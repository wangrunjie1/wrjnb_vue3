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
.tools-layout {
  display: flex;
  height: calc(100vh - 60px);
  min-height: 0;
  position: relative;
}
.tools-sidebar {
  width: 220px;
  background: rgba(255, 255, 255, 0.95);
  border-right: 1px solid #f0f0f0;
  padding-top: 2.5rem;
  height: calc(100vh - 60px);
  min-height: 0;
  z-index: 2;
  overflow-y: auto;
}
.tools-menu {
  border-right: none;
  background: transparent;
}
.tools-content {
  flex: 1;
  padding: 2.5rem 2vw 2.5rem 2vw;
  min-width: 0;
  height: calc(100vh - 60px);
  overflow-y: auto;
}
.mobile-nav-btn {
  position: fixed;
  top: 18px;
  right: 18px;
  z-index: 1002;
  /* 提高可见性 */
  .mobile-nav-btn-inner {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #409eff;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    font-size: 28px;
    box-shadow: 0 2px 12px rgba(64, 158, 255, 0.18);
    transition: background 0.2s;
  }
  .mobile-nav-btn-inner:hover {
    background: #66b1ff;
  }
  svg {
    display: block;
    margin: auto;
  }
}
.mobile-drawer {
  z-index: 1003;
}
@media (max-width: 900px) {
  .tools-layout {
    flex-direction: column;
    min-height: 0;
  }
  .tools-sidebar {
    display: none;
    height: auto;
  }
  .tools-content {
    padding: 1.2rem 0.5rem;
    overflow-y: visible;
  }
  .mobile-drawer {
    /* 让抽屉内容高度自适应屏幕 */
    height: 100vh !important;
    max-height: 100vh;
  }
}
.tools-root {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px) saturate(180%);
}
</style>

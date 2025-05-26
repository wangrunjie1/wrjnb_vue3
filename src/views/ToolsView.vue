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
            <el-menu-item
              v-for="item in group.items"
              :key="item.index"
              :index="item.index"
            >{{ item.title }}</el-menu-item>
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
        style="background: #409eff; color: #fff; box-shadow: 0 2px 12px rgba(64,158,255,0.18);"
      >
        <svg width="26" height="26" viewBox="0 0 1024 1024" fill="currentColor">
          <rect x="192" y="256" width="640" height="80" rx="40"/>
          <rect x="192" y="472" width="640" height="80" rx="40"/>
          <rect x="192" y="688" width="640" height="80" rx="40"/>
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
            <el-menu-item
              v-for="item in group.items"
              :key="item.index"
              :index="item.index"
            >{{ item.title }}</el-menu-item>
          </el-sub-menu>
        </template>
      </el-menu>
    </el-drawer>
    <main class="tools-content">
      <router-view />
    </main>
    <el-dialog v-model="aboutDialog" title="关于工具箱" width="350">
      <div style="text-align: center">
        <p>本页面收集了常用实用工具，持续更新中。</p>
        <p style="font-size: 0.95em; color: #888">如有建议欢迎反馈！</p>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const aboutDialog = ref(false)
const route = useRoute()
const router = useRouter()

const activeCategory = computed(() => route.path)

const isMobile = ref(false)
const drawerVisible = ref(false)

function handleCategorySelect(index: string) {
  router.push(index)
}
function handleDrawerSelect(index: string) {
  router.push(index)
  drawerVisible.value = false
}

// 菜单结构抽离
const menuGroups = [
  {
    index: 'text',
    title: '文本工具',
    items: [
      { index: '/tools/strlen', title: '字符串长度统计' },
      { index: '/tools/textdedup', title: '文本去重' },
      { index: '/tools/jsonformat', title: 'JSON格式化美化' },
      { index: '/tools/notepad', title: '在线记事本' },
      { index: '/tools/chinesepinyin', title: '汉字转拼音' },
      { index: '/tools/han2unicode', title: '汉字转Unicode' }, // 新增
      { index: '/tools/unicode2han', title: 'Unicode转汉字' }, // 新增
      { index: '/tools/randomname', title: '随机姓名生成' },   // 新增
      { index: '/tools/moneyupper', title: '金额大写转换' },
      { index: '/tools/text2voice', title: '文字转语音' },
    ],
  },
  {
    index: 'encode',
    title: '编码工具',
    items: [
      { index: '/tools/base64', title: 'Base64编解码' },
      { index: '/tools/urlencode', title: 'URL编码解码' },
      { index: '/tools/md5', title: 'MD5加密' },
      { index: '/tools/img2base64', title: '图片转Base64' },
      { index: '/tools/shorturl', title: '短链生成' },
      { index: '/tools/asciiconvert', title: 'ASCII码转换' }, // 新增
      { index: '/tools/htmlentity', title: 'HTML实体编码解码' }, // 新增
      { index: '/tools/morse', title: '摩斯电码转换' }, // 新增
    ],
  },
  {
    index: 'color',
    title: '颜色工具',
    items: [
      { index: '/tools/colorconvert', title: 'RGB/HEX颜色转换' },
      { index: '/tools/colorpicker', title: '颜色取色器' },
      { index: '/tools/colorallconvert', title: '颜色进制转换' }, // 新增
    ],
  },
  {
    index: 'dev',
    title: '开发工具',
    items: [
      { index: '/tools/regex', title: '正则表达式测试' },
      { index: '/tools/jsondiff', title: 'JSON对比' },
      { index: '/tools/uuid', title: 'UUID生成' },
      { index: '/tools/uuidbatch', title: 'UUID批量生成' },
      { index: '/tools/radixconvert', title: '进制转换' },
      { index: '/tools/idcard', title: '身份证信息查询' },
      { index: '/tools/progressbar', title: '进度条生成器' },
      { index: '/tools/ipconvert', title: 'IP地址进制转换' }, // 新增
      { index: '/tools/idcardcheck', title: '身份证校验码计算' }, // 新增
      { index: '/tools/bankcardcheck', title: '银行卡校验码计算' }, // 新增
    ],
  },
  {
    index: 'time',
    title: '时间工具',
    items: [
      { index: '/tools/timestamp', title: '时间戳转换' },
      { index: '/tools/datediff', title: '日期差' },
      { index: '/tools/fishcountdown', title: '摸鱼倒计时' },
      { index: '/tools/countdown', title: '倒计时' },
      { index: '/tools/calendar', title: '万年历' },
      { index: '/tools/agecalc', title: '年龄计算器' },
      { index: '/tools/zodiac', title: '生肖/星座查询' }, // 新增
    ],
  },
  {
    index: 'life',
    title: '生活工具',
    items: [
      { index: '/tools/bmi', title: 'BMI计算器' },
      { index: '/tools/tipcalc', title: '小费计算器' },
      { index: '/tools/passwordgen', title: '随机密码生成器' },
      { index: '/tools/relatives', title: '亲戚称呼计算器' }, // 新增
      { index: '/tools/billbook', title: '记账本' },           // 新增
    ],
  },
  {
    index: 'query',
    title: '查询工具',
    items: [
      { index: '/tools/ipquery', title: 'IP归属地查询' },
      { index: '/tools/mobilequery', title: '手机号归属地查询' },
    ],
  },
  {
    index: 'other',
    title: '其他工具',
    items: [
      { index: '/tools/random', title: '随机数' },
      { index: '/tools/qr', title: '二维码' },
      { index: '/tools/note', title: '便签' },
      { index: '/tools/rate', title: '汇率' },
      { index: '/tools/douyindownload', title: '抖音视频下载' },
      { index: '/tools/lengthconvert', title: '长度换算' },
      { index: '/tools/dailyquote', title: '每日一言' },
      { index: '/tools/emojiwall', title: 'Emoji墙' },
      { index: '/tools/randomfact', title: '冷知识' },
      { index: '/tools/luckycolor', title: '今日幸运色' },
      { index: '/tools/weather', title: '天气' },
      { index: '/tools/poem', title: '诗词' },
      { index: '/tools/liuyao', title: '六爻工具' },
      { index: '/tools/unitconvert', title: '单位换算工具' },
    ],
  },
]

// 响应式判断屏幕宽度
function checkMobile() {
  isMobile.value = window.innerWidth <= 700
}
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})
onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
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
  background: rgba(255,255,255,0.95);
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
    box-shadow: 0 2px 12px rgba(64,158,255,0.18);
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

import { ref, onMounted, onUnmounted } from 'vue'
import type { Router } from 'vue-router'

export interface MenuItem {
  index: string
  title: string
}
export interface MenuGroup {
  index: string
  title: string
  items: MenuItem[]
}

export const menuGroups: MenuGroup[] = [
  {
    index: 'text',
    title: '文本工具',
    items: [
      { index: '/tools/strlen', title: '字符串长度统计' },
      { index: '/tools/textdedup', title: '文本去重' },
      { index: '/tools/jsonformat', title: 'JSON格式化美化' },
      { index: '/tools/notepad', title: '在线记事本' },
      { index: '/tools/chinesepinyin', title: '汉字转拼音' },
      { index: '/tools/han2unicode', title: '汉字转Unicode' },
      { index: '/tools/unicode2han', title: 'Unicode转汉字' },
      { index: '/tools/randomname', title: '随机姓名生成' },
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
      { index: '/tools/asciiconvert', title: 'ASCII码转换' },
      { index: '/tools/htmlentity', title: 'HTML实体编码解码' },
      { index: '/tools/morse', title: '摩斯电码转换' },
    ],
  },
  {
    index: 'color',
    title: '颜色工具',
    items: [
      { index: '/tools/colorconvert', title: 'RGB/HEX颜色转换' },
      { index: '/tools/colorpicker', title: '颜色取色器' },
      { index: '/tools/colorallconvert', title: '颜色进制转换' },
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
      { index: '/tools/ipconvert', title: 'IP地址进制转换' },
      { index: '/tools/idcardcheck', title: '身份证校验码计算' },
      { index: '/tools/bankcardcheck', title: '银行卡校验码计算' },
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
      { index: '/tools/zodiac', title: '生肖/星座查询' },
    ],
  },
  {
    index: 'life',
    title: '生活工具',
    items: [
      { index: '/tools/bmi', title: 'BMI计算器' },
      { index: '/tools/tipcalc', title: '小费计算器' },
      { index: '/tools/passwordgen', title: '随机密码生成器' },
      { index: '/tools/relatives', title: '亲戚称呼计算器' },
      { index: '/tools/billbook', title: '记账本' },
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

export function useToolsMenu(router: Router) {
  const isMobile = ref(false)
  const drawerVisible = ref(false)

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

  function handleCategorySelect(index: string) {
    router.push(index)
  }
  function handleDrawerSelect(index: string) {
    router.push(index)
    drawerVisible.value = false
  }

  return {
    menuGroups,
    isMobile,
    drawerVisible,
    handleCategorySelect,
    handleDrawerSelect,
  }
}

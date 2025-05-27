<template>
  <div class="sci-card">
    <h2 class="sci-title">随机姓名生成</h2>
    <el-input-number v-model="count" :min="1" :max="20" class="sci-input" />
    <el-button type="primary" class="sci-btn" style="margin-left:1em;" @click="gen">生成</el-button>
    <el-input v-model="names" type="textarea" :rows="6" readonly class="sci-input" style="margin-top:1em;" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const count = ref(5)
const names = ref('')
const lastNames = '赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜'.split('')
const firstNames = '伟刚勇毅俊峰强军平保东文辉力明永健世广志义兴良海山仁波宁贵福生龙元全国胜学祥才发武新利清飞彬富顺信子杰涛昌成康星光天达安岩中茂进林有坚和彪博诚先敬震振壮会思群豪心邦承乐绍功松善厚庆磊民友裕河哲江超浩亮政谦亨奇固之轮翰朗伯宏言若鸣朋斌梁栋维启克伦翔旭鹏泽晨辰士以建家致树炎德行时泰盛雄琛钧冠策腾楠榕风航弘'.split('')
function gen() {
  names.value = Array.from({length: count.value}, () =>
    lastNames[Math.floor(Math.random()*lastNames.length)] +
    firstNames[Math.floor(Math.random()*firstNames.length)] +
    (Math.random() > 0.5 ? firstNames[Math.floor(Math.random()*firstNames.length)] : '')
  ).join('\n')
}
</script>
<style scoped>
@import './_sci-style.css';
</style>

<template>
  <div class="blog-card" v-if="article">
    <div class="blog-header">
      <h2 class="blog-title">{{ article.title }}</h2>
      <div style="color:#888;">
        作者：{{ article.author?.username }} | 发布时间：{{ article.createdAt }}
      </div>
    </div>
    <img v-if="article.cover" :src="article.cover" style="max-width:100%;margin-bottom:1em;" />
    <div v-html="article.content" style="margin-bottom:2em;"></div>
    <div>
      <el-button :type="liked ? 'success' : 'default'" @click="toggleLike" :disabled="likeLoading" class="blog-btn">
        <el-icon><i class="el-icon-thumb"></i></el-icon>
        {{ liked ? '已点赞' : '点赞' }} ({{ likeCount }})
      </el-button>
    </div>
    <div style="margin-top:2em;">
      <h4>评论 ({{ comments.length }})</h4>
      <el-form v-if="user" @submit.prevent="submitComment" style="margin-bottom:1em;">
        <el-form-item>
          <el-input v-model="commentInput" placeholder="写下你的评论..." />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitComment" :loading="commentLoading" class="blog-btn">评论</el-button>
        </el-form-item>
      </el-form>
      <el-alert v-else type="info" title="请登录后评论" show-icon style="margin-bottom:1em;" />
      <el-timeline>
        <el-timeline-item v-for="c in comments" :key="c.id" :timestamp="c.createdAt">
          <b>{{ c.user?.username }}</b>：{{ c.content }}
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>
<script setup lang="ts">
import '@/assets/blog-theme.css'
import { ref, onMounted } from 'vue'
import {
  getArticleDetail, isLiked, likeArticle, unlikeArticle,
  getLikeCount, getComments, commentArticle
} from '@/api/blog'
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

const route = useRoute()
const id = route.params.id as string
const article = ref<any>(null)
const liked = ref(false)
const likeCount = ref(0)
const likeLoading = ref(false)
const comments = ref<any[]>([])
const commentInput = ref('')
const commentLoading = ref(false)
const userStore = useUserStore()
const user = userStore.user

async function fetchAll() {
  const [detail, likeRes, countRes, commentRes] = await Promise.all([
    getArticleDetail(id), isLiked(id), getLikeCount(id), getComments(id)
  ])
  if (detail.data.code === 0) article.value = detail.data.data
  liked.value = likeRes.data.data || false
  likeCount.value = countRes.data.data || 0
  comments.value = commentRes.data.data || []
}

async function toggleLike() {
  if (!user) {
    ElMessage.warning('请先登录')
    return
  }
  likeLoading.value = true
  try {
    if (liked.value) {
      await unlikeArticle(id)
      liked.value = false
      likeCount.value--
    } else {
      await likeArticle(id)
      liked.value = true
      likeCount.value++
    }
  } catch {
    ElMessage.error('操作失败')
  }
  likeLoading.value = false
}

async function submitComment() {
  if (!commentInput.value.trim()) {
    ElMessage.warning('请输入评论内容')
    return
  }
  commentLoading.value = true
  try {
    const res = await commentArticle(id, commentInput.value)
    if (res.data.code === 0) {
      commentInput.value = ''
      await fetchAll()
      ElMessage.success('评论成功')
    } else {
      ElMessage.error(res.data.msg)
    }
  } catch {
    ElMessage.error('评论失败')
  }
  commentLoading.value = false
}

onMounted(fetchAll)
</script>

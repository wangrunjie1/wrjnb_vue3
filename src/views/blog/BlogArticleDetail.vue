<template>
  <div class="blog-card" v-if="article">
    <div class="blog-header">
      <h2 class="blog-title">{{ article.title }}</h2>
      <div style="color: #888">
        作者：{{ article.author?.username }} | 发布时间：{{ article.createdAt }}
      </div>
    </div>
    <img v-if="article.cover" :src="article.cover" style="max-width: 100%; margin-bottom: 1em" />
    <div v-html="article.content" style="margin-bottom: 2em"></div>
    <div>
      <el-button
        :type="liked ? 'success' : 'default'"
        @click="toggleLike"
        :disabled="likeLoading"
        class="blog-btn"
      >
        <el-icon><i class="el-icon-thumb"></i></el-icon>
        {{ liked ? '已点赞' : '点赞' }} ({{ likeCount }})
      </el-button>
    </div>
    <div style="margin-top: 2em">
      <h4>评论 ({{ comments.length }})</h4>
      <el-form v-if="user" @submit.prevent="submitComment" style="margin-bottom: 1em">
        <el-form-item>
          <el-input v-model="commentInput" placeholder="写下你的评论..." />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitComment"
            :loading="commentLoading"
            class="blog-btn"
            >评论</el-button
          >
        </el-form-item>
      </el-form>
      <el-alert v-else type="info" title="请登录后评论" show-icon style="margin-bottom: 1em" />
      <el-timeline>
        <el-timeline-item v-for="c in comments" :key="c.id" :timestamp="c.createdAt">
          <b>{{ c.user?.username }}</b
          >：{{ c.content }}
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  getArticleDetail,
  isLiked,
  likeArticle,
  unlikeArticle,
  getLikeCount,
  getComments,
  commentArticle,
} from '@/api/index.ts'
import { useUserStore } from '@/stores/user.ts'
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
  // 公共请求
  const detailP = getArticleDetail(id)
  const likeCountP = getLikeCount(id)
  const commentsP = getComments(id)
  let isLikedP: Promise<any> | null = null
  if (userStore.token) isLikedP = isLiked(id)

  const [detailRes, likeCountRes, commentsRes, isLikedRes] = await Promise.all([
    detailP,
    likeCountP,
    commentsP,
    isLikedP,
  ])

  if (detailRes.code === 0) {
    article.value = detailRes.data
  } else {
    ElMessage.error(detailRes.msg || '获取文章详情失败')
    return
  }

  if (likeCountRes.code === 0) {
    likeCount.value = likeCountRes.data
  }

  if (commentsRes.code === 0) {
    comments.value = commentsRes.data
  }

  liked.value = isLikedRes ? isLikedRes.data || false : false
}

async function toggleLike() {
  if (!userStore.token) {
    ElMessage.warning('请先登录')
    return
  }

  try {
    if (liked.value) {
      const res = await unlikeArticle(id)
      if (res.code === 0) {
        liked.value = false
        likeCount.value--
      } else {
        ElMessage.error(res.msg || '取消点赞失败')
      }
    } else {
      const res = await likeArticle(id)
      if (res.code === 0) {
        liked.value = true
        likeCount.value++
      } else {
        ElMessage.error(res.msg || '点赞失败')
      }
    }
  } catch (error) {
    ElMessage.error('操作失败')
  }
}

async function submitComment() {
  if (!commentInput.value.trim()) {
    ElMessage.warning('请输入评论内容')
    return
  }

  try {
    const res = await commentArticle(id, commentInput.value)
    if (res.code === 0) {
      ElMessage.success('评论成功')
      commentInput.value = ''
      // 重新获取评论列表
      const commentsRes = await getComments(id)
      if (commentsRes.code === 0) {
        comments.value = commentsRes.data
      }
    } else {
      ElMessage.error(res.msg || '评论失败')
    }
  } catch (error) {
    ElMessage.error('评论失败')
  }
}

onMounted(fetchAll)
</script>

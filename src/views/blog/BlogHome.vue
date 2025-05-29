<template>
  <div class="blog-card">
    <div class="blog-header">
      <h2 class="blog-title">博客文章列表</h2>
      <div>
        <el-button
          v-if="user"
          @click="$router.push('/blog/my')"
          class="blog-btn"
          style="margin-left: 8px"
          >我的文章</el-button
        >
        <el-button
          v-if="user"
          @click="$router.push('/blog/create')"
          class="blog-btn"
          style="margin-left: 8px"
          >发布文章</el-button
        >
      </div>
    </div>
    <el-table :data="articles" class="blog-table" style="margin-top: 1em" v-loading="loading">
      <el-table-column prop="title" label="标题" min-width="180">
        <template #default="{ row }">
          <router-link :to="`/blog/article/${row.id}`" class="blog-link">{{
            row.title
          }}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="author.username" label="作者" width="120" />
      <el-table-column prop="createdAt" label="发布时间" width="180" />
      <el-table-column prop="likeCount" label="点赞" width="80" />
      <el-table-column prop="commentCount" label="评论" width="80" />
    </el-table>
  </div>
</template>
<script setup lang="ts">
import '@/assets/blog-theme.css'
import { ref, onMounted } from 'vue'
import { getAllArticles } from '@/api/blog'
import { useUserStore } from '@/stores/user'

const articles = ref([])
const loading = ref(false)
const userStore = useUserStore()
const user = userStore.user

onMounted(async () => {
  loading.value = true
  const res = await getAllArticles()
  if (res.data.code === 0) {
    articles.value = res.data.data
  }
  loading.value = false
})
</script>

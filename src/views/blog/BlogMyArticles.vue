<template>
  <div class="blog-card">
    <div class="blog-header">
      <h2 class="blog-title">我的文章</h2>
      <el-button @click="$router.push('/blog/create')" type="primary" class="blog-btn">
        发布新文章
      </el-button>
    </div>
    <el-table
      :data="articles"
      class="blog-table"
      style="margin-top: 1.5em"
      v-loading="loading"
      border
      stripe
      highlight-current-row
    >
      <el-table-column prop="title" label="标题" min-width="180">
        <template #default="{ row }">
          <router-link :to="`/blog/article/${row.id}`" class="blog-link">{{
            row.title
          }}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="发布时间" width="180" />
      <el-table-column prop="likeCount" label="点赞" width="80" />
      <el-table-column prop="commentCount" label="评论" width="80" />
      <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-button
            type="danger"
            size="small"
            @click="handleDelete(row.id)"
            class="blog-btn-delete"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getMyArticles, deleteArticle } from '@/api/index.ts'
import { ElMessage, ElMessageBox } from 'element-plus'

const articles = ref([])
const loading = ref(false)

async function fetchList() {
  loading.value = true
  const res = await getMyArticles()
  if (res.code === 0) {
    articles.value = res.data
  } else {
    ElMessage.error(res.msg || '获取文章列表失败')
  }
  loading.value = false
}

const handleDelete = async (id: string) => {
  try {
    const res = await deleteArticle(id)
    if (res.code === 0) {
      ElMessage.success('删除成功')
      articles.value = articles.value.filter((article) => article.id !== id)
    } else {
      ElMessage.error(res.msg || '删除失败')
    }
  } catch (error) {
    ElMessage.error('删除失败')
  }
}

onMounted(fetchList)
</script>

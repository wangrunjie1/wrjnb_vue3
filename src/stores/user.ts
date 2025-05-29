import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfo } from '@/api/blog'

export const useUserStore = defineStore('user', () => {
  const user = ref<any>(null)
  const token = ref(localStorage.getItem('token') || '')

  async function fetchUser() {
    if (!token.value) {
      user.value = null
      return
    }
    try {
      const res = await getUserInfo()
      if (res.data.code === 0) {
        user.value = res.data.data
      } else {
        user.value = null
        token.value = ''
        localStorage.removeItem('token')
      }
    } catch {
      user.value = null
      token.value = ''
      localStorage.removeItem('token')
    }
  }

  function setToken(t: string) {
    token.value = t
    localStorage.setItem('token', t)
  }

  function logout() {
    token.value = ''
    user.value = null
    localStorage.removeItem('token')
  }

  return { user, token, fetchUser, setToken, logout }
})

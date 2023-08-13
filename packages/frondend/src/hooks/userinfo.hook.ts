import { useUserStore } from '@/store'
import { computed } from 'vue'

export async function useUserInfo(userId: string, profile = false) {
  const userStore = useUserStore()
  const userinfo = userStore.userinfo[userId]
  if (!userinfo) {
    await userStore.fetchUserInfo([userId], profile)
  }
  return computed(() => {
    return (
      userStore.userinfo[userId] || {
        nickname: '...',
        avatar: '...',
      }
    )
  })
}

import { UserInfo } from '@/common/types/user'
import { useUserStore } from '@/store'
import { onLoad } from '@dcloudio/uni-app'
import { Ref, computed } from 'vue'

/**
 * 页面加载时获取用户的id和info，需要页面url的query中带有userid参数
 * @param useridRef 组件传入的useridRef
 * @param userInfoRef 组件传入的userinfoRef
 */
export async function useUserInfo(useridRef: Ref<string>, userInfoRef: Ref<UserInfo>) {
  const userStore = useUserStore()
  onLoad(async (options) => {
    const queryUserid = options?.userid
    if (!queryUserid) {
      uni.navigateBack()
      return
    }
    useridRef.value = queryUserid

    // 如果store中没有信息就loading进行加载
    if (!userStore.userinfo[queryUserid]) {
      uni.showLoading({
        title: '正在加载用户信息',
        mask: true,
      })
      await userStore.fetchUserInfo([queryUserid], true)
      uni.hideLoading()
    }

    const storeUserInfo = userStore.userinfo[queryUserid] || {}
    userInfoRef.value = {
      ...storeUserInfo,
    }
  })
}

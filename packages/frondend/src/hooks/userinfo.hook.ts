import { UserInfo } from '@/common/types/user'
import { useUserStore } from '@/store'
import { onLoad } from '@dcloudio/uni-app'
import { userInfo } from 'os'
import { Ref, computed } from 'vue'

/**
 * 页面加载时获取用户的id和info，需要页面url的query中带有userid参数
 * @param useridRef 组件传入的useridRef
 * @param userInfoRef 组件传入的userinfoRef
 */
export async function useLoadUserInfo(useridRef: Ref<string>, userInfoRef: Ref<UserInfo>) {
  onLoad(async (options) => {
    const queryUserid = options?.userid
    if (!queryUserid) {
      uni.navigateBack()
      return
    }
    useridRef.value = queryUserid

    useUserInfo(queryUserid, userInfoRef)
  })
}

export async function useUserInfo(userid: string, userInfoRef: Ref<UserInfo>) {
  const userStore = useUserStore()
  // 如果store中没有信息就loading进行加载
  if (!userStore.userinfo[userid]) {
    uni.showLoading({
      title: '正在加载用户信息',
      mask: true,
    })
    await userStore.fetchUserInfo([userid], true)
    uni.hideLoading()
  }

  const storeUserInfo = userStore.userinfo[userid] || {}
  userInfoRef.value = {
    ...storeUserInfo,
  }
}

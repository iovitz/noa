<template>
  <CommonPageWrapper
    title="用户资料"
    :buttonText="isFriends ? '发消息' : '添加好友'"
    :buttonClick="buttonClick"
    :show-button="true"
  >
    <avatar-header
      :nickname="userinfo.nickname || '...'"
      :desc="`HAHA号：${hahaNumber}`"
    ></avatar-header>

    <view class="user-info">
      <uni-group type="card" title="签名">
        <uni-list-item
          showArrow
          :border="false"
          clickable
          :title="userinfo.profile?.desc || '这个人很懒，什么也没留下'"
        />
      </uni-group>
      <uni-group type="card" title="个人信息">
        <uni-list-item
          :border="false"
          title="年龄"
          :rightText="userinfo.profile?.birth || '保密'"
        />
        <uni-list-item
          :border="false"
          title="生日"
          :rightText="userinfo.profile?.birth || '保密'"
        />
      </uni-group>
    </view>
    <uni-group type="card" title="空间动态">
      <uni-list-item :border="false" showArrow clickable title="他的空间" rightText="10条内容" />
    </uni-group>
  </CommonPageWrapper>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import CommonPageWrapper from '@/comps/common-page-wrapper/common-page-wrapper.vue'
import logger from '@/utils/logger'
import AvatarHeader from '@/comps/avatar-header/avatar-header.vue'
import { onLoad } from '@dcloudio/uni-app'
import { useUserStore } from '@/store'

const userStore = useUserStore()

const hahaNumber = ref('...')
const isFriends = ref(false)
const userinfo = ref<{
  nickname?: string
  avatar?: string
  profile?: {
    birth?: string
    desc?: string
    gender?: string
  }
}>({})

const buttonClick = () => {
  if (isFriends.value) {
    logger.verbose('发送消息')
  } else {
    uni.navigateTo({
      url: '/pages/add/add',
    })
  }
}

watch([hahaNumber, userStore.userinfo], () => {
  const userid = hahaNumber.value
  const storeInfo = userStore.userinfo
  if (!storeInfo || !storeInfo[userid]) {
    return
  }
  userinfo.value = storeInfo[userid]
})

onLoad(async (options) => {
  const userid = options?.userid
  if (!userid) {
    uni.navigateBack()
    return
  }
  await userStore.fetchUserInfo([userid], true)
  hahaNumber.value = userid
})
</script>

<style lang="scss" scoped></style>

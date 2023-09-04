<template>
  <CommonPageWrapper
    :title="titleText"
    buttonText="发送申请"
    :showButton="true"
    :buttonClick="handleApply"
    :buttonDisabled="!!userid"
  >
    <avatar-header nickname="不锈钢盆" desc="256899231"></avatar-header>
    <uni-group title="填写验证信息">
      <view class="px-4">
        <uni-easyinput type="textarea" v-model="message" placeholder="请输入内容"></uni-easyinput>
      </view>
    </uni-group>
  </CommonPageWrapper>
</template>

<script lang="ts" setup>
import CommonPageWrapper from '@/comps/common-page-wrapper/common-page-wrapper.vue'
import { computed, ref } from 'vue'
import AvatarHeader from '@/comps/avatar-header/avatar-header.vue'
import { UserInfo } from '@/common/types/user'
import { useUserInfo } from '@/hooks/userinfo.hook'
import { rFriendRequest } from '@/io/http/apply'

const isAddUser = ref(true)

const titleText = computed(() => {
  return isAddUser.value ? '发送好友申请' : '发送群聊申请'
})

const message = ref('')

// 当前主页的userid
const userid = ref('')
// 用户信息
const userinfo = ref<UserInfo>({
  nickname: '',
})

const handleApply = async () => {
  await rFriendRequest(userid.value, message.value)
  uni.navigateBack()
  uni.showToast({
    icon: 'success',
    title: '成功发送申请',
    duration: 1000,
  })
}
useUserInfo(userid, userinfo)
</script>

<style lang="scss" scoped></style>

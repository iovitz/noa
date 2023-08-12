<template>
  <CommonPageWrapper
    title="用户资料"
    :buttonText="isFriends ? '发消息' : '添加好友'"
    :buttonClick="buttonClick"
    :show-button="true"
  >
    <avatar-header :nickname="nickname" :desc="`HAHA号：${hahaNumber}`"></avatar-header>

    <view class="user-info">
      <uni-group type="card" title="签名">
        <uni-list-item showArrow :border="false" clickable :title="signature" />
      </uni-group>
      <uni-group type="card" title="个人信息">
        <uni-list-item :border="false" title="年龄" :rightText="age" />
        <uni-list-item :border="false" title="生日" :rightText="birth" />
      </uni-group>
    </view>
    <uni-group type="card" title="空间动态">
      <uni-list-item :border="false" showArrow clickable title="他的空间" rightText="10条内容" />
    </uni-group>
  </CommonPageWrapper>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import CommonPageWrapper from '@/comps/common-page-wrapper/common-page-wrapper.vue'
import logger from '@/utils/logger'
import AvatarHeader from '@/comps/avatar-header/avatar-header.vue'
import { onLoad } from '@dcloudio/uni-app'
import { rGetUserInfo } from '@/io/http/user'

const isFriends = ref(false)
const nickname = ref('...')
const signature = ref('...')
const hahaNumber = ref('...')
const age = ref('保密')
const birth = ref('保密')
const address = ref('保密')

const buttonClick = () => {
  if (isFriends.value) {
    logger.verbose('发送消息')
  } else {
    uni.navigateTo({
      url: '/pages/add/add',
    })
  }
}
onLoad(async (options) => {
  const userid = options?.userid
  if (!userid) {
    uni.navigateBack()
    return
  }
  const { data } = await rGetUserInfo(userid)
  nickname.value = data.nickname
  hahaNumber.value = data.userid
  signature.value = data.profile?.desc || '这个用户很有趣，什么都没留下'
  birth.value = `${data.profile.birth || '保密'}`
  age.value = `${14}`
})
</script>

<style lang="scss" scoped></style>

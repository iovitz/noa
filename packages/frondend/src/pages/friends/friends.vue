<template>
  <pageWithTabbar>
    <uni-list :border="false">
      <uni-list-item
        showArrow
        :border="false"
        clickable
        title="新朋友"
        @tap="() => handleGoNotice(0)"
      />
      <uni-list-item
        showArrow
        :border="false"
        clickable
        title="群通知"
        @tap="() => handleGoNotice(1)"
      />
    </uni-list>
    <view class="mt-4">
      <uni-list :border="false">
        <FriendItem
          v-for="userid in userStore.friends"
          :key="userid"
          :userid="userid"
          :handleClick="() => selectUser(userid)"
        />
      </uni-list>
    </view>
  </pageWithTabbar>
</template>

<script lang="ts" setup>
import pageWithTabbar from '@/comps/page-with-tabbar/page-with-tabbar.vue'
import { useUserStore } from '@/store'
import FriendItem from './friend-item.vue'
const userStore = useUserStore()

const selectUser = (userid: string) => {
  uni.navigateTo({
    url: '/pages/home/home?userid=' + userid,
  })
}
const handleGoNotice = (tabName: number) => {
  uni.navigateTo({
    url: '/pages/notice/notice?tab=' + tabName,
  })
}
</script>

<style lang="scss" scoped></style>

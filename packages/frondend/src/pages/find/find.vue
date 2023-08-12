<template>
  <view class="find-page">
    <uni-nav-bar
      dark
      class="text-white"
      left-icon="left"
      title="查找用户"
      :border="false"
      height="100upx"
      status-bar
      background-color="#2AC4FF"
      :fixed="true"
      @clickLeft="handleBackup"
    />
    <uni-search-bar
      :focus="true"
      v-model="searchValue"
      placeholder="输入HaHa号或昵称"
      cancelButton="true"
      @confirm="handleFindUserOrGroup"
      :maxlength="20"
    >
    </uni-search-bar>
    <uni-group title="用户" top="20">
      <template v-if="userSearchResult.length > 0">
        <uni-list-chat
          :title="nickname"
          @tap="handleOpenUserHome"
          clickable
          :avatar-list="avatarList"
          :note="userid"
          v-for="{ nickname, userid } in userSearchResult"
          :key="userid"
        />
      </template>
      <view v-else class="search-place-holder"> 暂无符合条件的用户 </view>
    </uni-group>
    <uni-group title="群聊" top="20">
      <template v-if="groupSearchResult.length > 0">
        <uni-list-chat
          :title="name"
          v-for="{ name, groupid } in groupSearchResult"
          :key="groupid"
          clickable
          :avatar-list="avatarList"
          :note="groupid"
        />
      </template>
      <view v-else class="search-place-holder"> 暂无符合条件的用户 </view>
    </uni-group>
  </view>
</template>

<script lang="ts" setup>
import { rSearchGroup } from '@/io/http/group'
import { rSearchUser } from '@/io/http/user'
import { ref } from 'vue'

const searchValue = ref('')
const userSearchResult = ref<
  {
    nickname: string
    userid: string
    avatar: string
  }[]
>([])
const groupSearchResult = ref<
  {
    name: string
    groupid: string
    avatar?: string
  }[]
>([])

const avatarList = ref([
  {
    url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png',
  },
])

const handleBackup = () => {
  uni.navigateBack()
}

const handleFindUserOrGroup = async () => {
  if (!searchValue.value) return
  const findUsers = await rSearchUser(searchValue.value)
  const findGroups = await rSearchGroup(searchValue.value)
  userSearchResult.value = findUsers.data.map((user) => {
    return {
      nickname: user.nickname,
      userid: user.userid,
      avatar: user.avatar,
    }
  })
  groupSearchResult.value = findGroups.data
}

const handleOpenUserHome = (id: number) => {
  uni.navigateTo({
    url: '/pages/home/home?userid=',
  })
}
</script>

<style lang="scss" scoped>
.find-page {
  height: 100%;
  width: 100%;
  background-color: #fff;
}
.search-result-list {
  padding: 30upx;
}
.search-user-item {
  display: flex;
  margin-bottom: 30upx;
  .user-info {
    flex: 1;
  }
}
.search-place-holder {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20upx;
  font-size: 24upx;
  color: #999;
}
</style>

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
    </uni-list>
    <Default
      v-if="userStore.friends.length === 0"
      style="padding-top: 200upx"
      type="history"
      title="消息"
    />
    <view class="mt-4" v-else>
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

<script setup>
import pageWithTabbar from "@/comps/page-with-tabbar/page-with-tabbar.vue";
import Default from "@/comps/default/default.vue";
import { useUserStore } from "@/store";
import FriendItem from "./friend-item.vue";
const userStore = useUserStore();

const selectUser = (userid) => {
  uni.navigateTo({
    url: "/pages/home/home?userid=" + userid,
  });
};
const handleGoNotice = (tabName) => {
  uni.navigateTo({
    url: "/pages/notice/notice?tab=" + tabName,
  });
};
</script>

<style lang="scss" scoped></style>

<template>
  <view class="user-aside">
    <view class="header flex flex-row items-center" @click="jumpToHome">
      <image class="avatar" mode="aspectFit" :src="authStore.avatar" />
      <view class="info">
        <view class="font-bold text-xl text-ellipsis">{{
          authStore.nickname
        }}</view>
        <view class="text-sm text-ellipsis">{{ authStore.desc }}</view>
      </view>
    </view>

    <uni-list :border="false">
      <uni-group
        class="user-aside-list-group bg-white"
        type="card"
        title="账号管理"
      >
        <uni-list-item
          showArrow
          :border="false"
          clickable
          to="/pages/personal_information/personal_information"
          title="个人信息"
          link
        />
        <uni-list-item showArrow :border="false" clickable title="账号管理" />
        <uni-list-item
          showArrow
          :border="false"
          clickable
          @tap="handleLogout"
          title="退出登录"
        />
      </uni-group>

      <uni-group
        class="user-aside-list-group bg-white"
        type="card"
        title="关于和帮助"
      >
        <uni-list-item
          :border="false"
          clickable
          to="/pages/commits/commits"
          title="研发日志"
          rightText="已是最新版本"
        />
        <uni-list-item showArrow :border="false" clickable title="反馈" />
      </uni-group>
    </uni-list>
  </view>

  <uni-popup ref="sectionRef" type="dialog">
    <uni-popup-dialog
      type="info"
      cancelText="取消"
      confirmText="确认"
      title="请确认"
      content="请确认是否要登出哈聊社区"
      @confirm="handleLogoutConfirm"
      @close="dialogClose"
    ></uni-popup-dialog>
  </uni-popup>
</template>

<script setup>
import { rLogout } from "@/io/http/auth";
import { useAuthStore } from "@/store";
import { getSession, storage } from "@/utils/storage";
import { computed, ref } from "vue";

const authStore = useAuthStore();

const sectionRef = ref();
const handleLogout = () => {
  sectionRef.value.open();
};

const handleLogoutConfirm = async () => {
  const session = getSession();
  if (!session) return;
  rLogout(session);
  storage.remove("session");
  sectionRef.value.close();
  uni.showToast({
    icon: "success",
    title: "退出登录成功",
    duration: 1000,
  });
  setTimeout(() => {
    uni.reLaunch({
      url: "/pages/entry/entry",
    });
  }, 1000);
};
const dialogClose = () => {
  sectionRef.value?.close();
};

const jumpToHome = () => {
  uni.navigateTo({
    url: "/pages/home/home?userid=" + authStore.userid,
  });
};
</script>

<style lang="scss" scoped>
.user-aside {
  height: 100%;
  width: 100%;
  background-color: #ffffff;
  .header {
    padding: 80upx 30upx;
    .avatar {
      height: 100upx;
      width: 100upx;
      border-radius: 50%;
    }
    .info {
      max-width: 400upx;
      margin-left: 20upx;
      .text-sm {
        font-size: 24upx !important;
      }
    }
  }
}
</style>
@/io/http/auth @/store

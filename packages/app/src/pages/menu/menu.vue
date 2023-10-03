<template>
  <view class="user-aside">
    <view class="header flex flex-row items-center">
      <image
        class="avatar"
        mode="aspectFit"
        :src="'https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png'"
      />
      <view>
        <view class="font-bold text-xl text-ellipsis">{{
          userInfo.nickname
        }}</view>
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
          title="个人信息"
          link
          to="/pages/vue/index/index"
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

const userInfo = computed(() => {
  return {
    nickname: authStore.nickname,
  };
});
const sectionRef = ref();
const handleLogout = () => {
  sectionRef.value.open();
};

const navigateTo = (url) => {
  return uni.navigateTo({
    url,
  });
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
      margin-right: 20upx;
    }
  }
}
</style>
@/io/http/auth @/store

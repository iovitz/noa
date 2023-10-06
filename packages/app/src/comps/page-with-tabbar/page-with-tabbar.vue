<template>
  <view class="page-with-tabbar">
    <uni-nav-bar
      dark
      class="nav-bar border-none"
      height="100upx"
      :fixed="true"
      background-color="#575170"
      status-bar
      leftWidth="80upx"
      rightWidth="80upx"
      :border="false"
    >
      <template #left>
        <view class="w-full h-full flex flex-row items-center justify-end">
          <image
            class="avatar"
            mode="aspectFit"
            @tap="openUserAside"
            :src="userInfo.avatar"
          ></image>
        </view>
      </template>
      <template #right>
        <view
          class="w-full h-full flex flex-row items-center justify-center relative"
        >
          <uni-icons
            type="plusempty"
            size="24"
            color="#ffffff"
            @tap="handleOpenHeaderMenu"
          />
        </view>
      </template>
      <view class="flex w-full h-full flex-col justify-center">
        <text class="font-bold">{{ userInfo.nickname }}</text>
        <text class="text-sm">在线</text>
      </view>
    </uni-nav-bar>
  </view>

  <scroll-view
    :scroll-y="true"
    :style="`height: ${swiperHeight}px`"
    @scrolltolower="handleLoadMore"
  >
    <!-- 页面内容 -->
    <slot name="default" />
  </scroll-view>

  <uni-popup ref="headerMenu" background-color="#fff" :safe-area="true">
    <view class="popup-placeholder"></view>
    <view class="add-dropdown">
      <view @tap="goFindPage">
        <uni-icons type="personadd" />
        添加好友
      </view>
      <view @tap="goCreatGroup">
        <uni-icons type="plusempty" />
        创建群聊
      </view>
    </view>
  </uni-popup>

  <uni-drawer ref="userAside" mode="left" :width="250">
    <view class="w-full h-full fix-status-bar">
      <user-aside />
    </view>
  </uni-drawer>
</template>
<script>
import { defineComponent } from "vue";
import UserAside from "@/comps/user-aside/user-aside.vue";
import logger from "@/utils/logger";
import { useAuthStore } from "@/store";
import { computed } from "vue";

export default defineComponent({
  components: {
    UserAside,
  },
  data() {
    return {
      refreshFlag: false,
      swiperHeight: 0,
    };
  },
  activated() {
    const userAsideRef = this.$refs.userAside;
    const headerMenuRef = this.$refs.headerMenu;
    headerMenuRef?.close();
    userAsideRef?.close();
  },
  mounted() {
    uni.getSystemInfo({
      success: (res) => {
        // 拿到可用window高度
        // 可用window高度 = 窗口高度 - 状态栏高度 - bottom占用（底部的tabBar高度，H5下为0，app下计算高度）
        const windowHeight =
          (res.safeArea?.height ||
            res.windowHeight - (res.statusBarHeight ?? 0)) - res.windowBottom;
        // 如果有NavBar需要减去NavBar高度和已经被占用的高度
        this.swiperHeight = windowHeight - uni.upx2px(100);
      },
    });
  },
  methods: {
    openUserAside() {
      uni.navigateTo({
        url: "/pages/menu/menu",
      });
    },
    goFindPage() {
      const headerMenuRef = this.$refs.headerMenu;
      headerMenuRef?.close();
      uni.navigateTo({
        url: "/pages/find/find",
      });
    },
    goCreatGroup() {
      const headerMenuRef = this.$refs.headerMenu;
      headerMenuRef?.close();
      uni.navigateTo({
        url: "/pages/new_group/new_group",
      });
    },
    handleOpenHeaderMenu() {
      const headerMenuRef = this.$refs.headerMenu;
      headerMenuRef?.open("top");
    },
    handleRefresh() {
      this.refreshFlag = true;
      logger.verbose("下拉刷新");
      setTimeout(() => {
        this.refreshFlag = false;
      }, 1000);
    },
    handleLoadMore() {
      logger.verbose("加载更多");
    },
  },
  setup() {
    const authStore = useAuthStore();
    const userInfo = computed(() => {
      return {
        nickname: authStore.nickname,
        desc: authStore.desc,
        avatar: authStore.avatar,
      };
    });
    return {
      userInfo,
    };
  },
});
</script>
<style lang="scss" scoped>
.nav-bar {
  .avatar {
    height: 70upx;
    width: 70upx;
    border-radius: 50%;
  }
}
.popup-placeholder {
  padding-top: var(--status-bar-height);
  height: 100upx;
}
.add-dropdown {
  top: 30upx;
  right: 30upx;
  background-color: #ffffff;
  border-radius: 10upx;
  font-size: 28upx;
  & > * {
    padding: 30upx;
  }
}
</style>
@/store

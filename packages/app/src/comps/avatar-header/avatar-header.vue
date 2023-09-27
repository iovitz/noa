<template>
  <view class="header">
    <image
      class="avatar"
      mode="aspectFit"
      :src="'https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png'"
    />
    <view class="home-info">
      <view class="nickname text-ellipsis">{{ nickname }}</view>
      <view class="haha-number text-sm text-ellipsis">{{ desc }}</view>
    </view>
  </view>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    nickname: {
      type: String,
    },
    desc: {
      type: String,
    },
    avatar: {
      type: String,
    },
  },
});
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: home-between;
  padding: 50upx 30upx;
  .avatar {
    height: 140upx;
    width: 140upx;
    border-radius: 50%;
    margin-right: 20upx;
  }
  .home-info {
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .nickname {
      font-weight: bold;
      font-size: 1.2em;
    }
    .haha-number {
      font-size: 24upx;
      margin-top: 6upx;
    }
  }
}
</style>

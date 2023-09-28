<template>
  <view class="launch-page">
    <view class="ad-banner"></view>
    <view class="app-icon"></view>
  </view>
  <view class="skip-button" @click="handleSkip"> {{ time }}秒后跳过 </view>
</template>

<script setup>
import { onMounted, ref } from "vue";
const time = ref(5);

const handleSkip = () => {
  uni.navigateBack();
};
onMounted(() => {
  const timer = setInterval(() => {
    if (time.value === 0) {
      clearInterval(timer);
      handleSkip();
      return;
    }
    time.value--;
  }, 1000);
});
</script>

<style lang="scss" scoped>
.skip-button {
  height: 48upx;
  padding: 0 25upx;
  font-size: 24upx;
  border-radius: 48upx;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 9999;
  top: 60upx;
  right: 30upx;
}
.launch-page {
  height: 100%;
  width: 100%;
  background-color: #ddd;
  .ad-banner {
    height: calc(100vh - 200upx);
  }
  .app-icon {
    height: 200upx;
    background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

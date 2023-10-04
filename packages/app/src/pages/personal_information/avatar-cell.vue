<template>
  <uni-list-item
    showArrow
    :border="false"
    clickable
    title="头像"
    link
    @click="handleSwitchAvatarImage"
  >
    <template #footer>
      <image
        class="avatar-image"
        src="/static/logo.svg"
        mode="widthFix"
      ></image> </template
  ></uni-list-item>
</template>
<script setup>
const handleSwitchAvatarImage = () => {
  // 上传头像
  uni.chooseImage({
    count: 1,
    success(res) {
      console.log("###", res);
    },
  });
};
</script>
<style lang="scss" scoped>
.avatar-image {
  height: 80upx;
  width: 80upx;
}
</style>

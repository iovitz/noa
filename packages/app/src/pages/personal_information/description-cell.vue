<template>
  <uni-list-item
    :border="false"
    showArrow
    clickable
    title="个性签名"
    @click="openDialog"
  >
    <template #footer>
      <text class="small-text text-ellipsis">
        {{ authStore.desc ?? "这个人很有趣什么也没留下" }}
      </text>
    </template>
  </uni-list-item>
  <uni-popup ref="popup" type="dialog">
    <uni-popup-dialog
      title="修改签名"
      mode="input"
      :value="authStore.desc"
      message="成功消息"
      :duration="2000"
      :before-close="true"
      @confirm="confirm"
      @close="closeDialog"
    ></uni-popup-dialog>
  </uni-popup>
</template>
<script setup>
import { useAuthStore } from "@/store";
import { ref } from "vue";
const authStore = useAuthStore();

const popup = ref();
const openDialog = () => {
  popup.value?.open();
};

const closeDialog = () => {
  popup.value?.close();
};

const confirm = (desc) => {
  closeDialog();
  if (desc.length > 100) {
    uni.showToast({
      icon: "error",
      title: "修改失败，签名长度不能超过100个字符",
    });
    return;
  }
  authStore.updateUserInfo({
    desc,
  });
};
</script>
<style lang="scss" scoped>
.small-text {
  font-size: 24upx;
  max-width: 400upx;
}
</style>

<template>
  <uni-list-item
    showArrow
    :border="false"
    clickable
    title="昵称"
    link
    @click="openDialog"
    :rightText="authStore.nickname"
  />
  <uni-popup ref="popup" type="dialog">
    <uni-popup-dialog
      title="修改昵称"
      mode="input"
      :value="authStore.nickname"
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
import logger from "@/utils/logger";
import { ref } from "vue";

const authStore = useAuthStore();

const popup = ref();
const openDialog = () => {
  popup.value?.open();
};

const closeDialog = () => {
  popup.value?.close();
};

const confirm = (nickname) => {
  closeDialog();
  if (nickname.length < 2 || nickname.length > 10) {
    uni.showToast({
      icon: "error",
      title: "修改失败，昵称长度在2~10位之间",
    });
    return;
  }
  authStore.updateUserInfo({
    nickname,
  });
};
</script>
<style lang="scss" scoped></style>

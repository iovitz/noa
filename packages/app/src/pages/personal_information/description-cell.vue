<template>
  <uni-list-item
    showArrow
    :border="false"
    clickable
    title="昵称"
    link
    :rightText="authStore.nickname"
  />
</template>
<script setup>
import { useAuthStore } from "@/store";
const authStore = useAuthStore();
</script>
<style lang="scss" scoped></style>

<template>
  <uni-list-item
    :border="false"
    showArrow
    clickable
    title="个性签名"
    rightText="少来探究我"
  />
</template>
<script setup>
import { useAuthStore } from "@/store";
const authStore = useAuthStore();
</script>
<style lang="scss" scoped></style>

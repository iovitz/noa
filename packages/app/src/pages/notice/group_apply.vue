<template>
  <uni-list-item
    :border="false"
    title="不锈钢盆"
    note="这里就不是什么"
    thumb="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
    thumb-size="lg"
    v-for="i in 10"
    :key="i"
  />
</template>

<script setup>
import FriendApplyListItem from "@/comps/friend-apply-list-item/friend-apply-list-item.vue";
import logger from "@/utils/logger";
import { useApplyStore } from "@/store";

const applyStore = useApplyStore();
</script>

<style lang="scss" scoped></style>

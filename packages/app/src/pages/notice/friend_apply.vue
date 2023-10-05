<template>
  <Default
    v-if="applyStore.applyList.length === 0"
    style="padding-top: 200upx"
    type="like"
    title="消息"
  />
  <FriendApplyListItem
    v-for="(item, idx) in applyStore.applyList"
    :desc="item.reason"
    v-else
    :userid="item.from"
    :key="item.from"
    :handle-click="() => handleClick(item, idx)"
    :pass="item.pass"
  />
</template>

<script setup>
import FriendApplyListItem from "@/comps/friend-apply-list-item/friend-apply-list-item.vue";
import { useApplyStore } from "@/store";
import Default from "@/comps/default/default.vue";

const applyStore = useApplyStore();
applyStore.requestApplyList();

const handleClick = async (item, idx) => {
  applyStore.passApply(item.from, idx);
};
</script>

<style lang="scss" scoped></style>

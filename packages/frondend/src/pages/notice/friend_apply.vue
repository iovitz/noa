<template>
  <FriendApplyListItem
    v-for="(item, idx) in applyStore.applyList"
    :desc="item.reason"
    :userid="item.from"
    :key="item.from"
    :handle-click="() => handleClick(item, idx)"
    :pass="item.pass"
  />
</template>

<script lang="ts" setup>
import { ApplyItem } from '@/common/types/apply'
import FriendApplyListItem from '@/comps/friend-apply-list-item/friend-apply-list-item.vue'
import { useApplyStore } from '@/store'

const applyStore = useApplyStore()
applyStore.requestApplyList()

const handleClick = async (item: ApplyItem, idx: number) => {
  applyStore.passApply(item.from, idx)
}
</script>

<style lang="scss" scoped></style>

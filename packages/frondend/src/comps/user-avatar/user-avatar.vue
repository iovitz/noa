<template>
  <text> 内容为空 </text>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store'
const userStore = useUserStore

const props = defineProps<{
  userid: string
}>()

// const avatarUrl =
</script>

<style lang="scss" scoped></style>

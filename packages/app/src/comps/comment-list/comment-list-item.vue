<template>
  <view class="comment-wrapper"> </view>
</template>
<script setup>
import { computed } from "vue";
const props = defineProps(["commentList"]);
console.log(props.commentList);
</script>
<style lang="scss" scoped></style>

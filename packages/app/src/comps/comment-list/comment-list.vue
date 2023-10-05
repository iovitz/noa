<template>
  <view class="comment-wrapper"> </view>
</template>
<script setup>
import { computed } from "vue";
const props = defineProps(["commentList"]);
console.log(props.commentList);
const commentIdMap = {};
// eslint-disable-next-line vue/no-mutating-props
const res = props.commentList
  .sort((a, b) => a.pid - b.pid)
  .reduce((result, current) => {
    current.children = [];
    commentIdMap[current.id] = current;
    if (current.pid === 0) {
      result.push(current);
    } else {
      commentIdMap[current.pid].children.push(current);
    }
    return result;
  }, []);

console.log(res);
</script>
<style lang="scss" scoped></style>

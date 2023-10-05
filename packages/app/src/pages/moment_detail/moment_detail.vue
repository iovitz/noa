<template>
  <CommonPageWrapper title="内容详情">
    <MomentCard></MomentCard>

    <CommentList :commentList="commentList" />
  </CommonPageWrapper>
</template>
<script setup>
import CommonPageWrapper from "@/comps/common-page-wrapper/common-page-wrapper.vue";
import CommentList from "@/comps/comment-list/comment-list.vue";
import MomentCard from "@/comps/moment-card/moment-card.vue";

const commentList = [
  {
    time: Date.now(),
    id: 1,
    pid: 0,
    content: "第一条评论",
  },
  {
    time: Date.now(),
    id: 2,
    pid: 1,
    content: "回复第一条评论",
  },
  {
    time: Date.now(),
    id: 3,
    pid: 1,
    content: "回复第一条评论",
  },

  {
    time: Date.now(),
    id: 4,
    pid: 2,
    content: "回复第一条评论",
  },
  {
    time: Date.now(),
    id: 5,
    pid: 0,
    content: "第二条评论",
  },
];
</script>
<style lang="scss" scoped></style>

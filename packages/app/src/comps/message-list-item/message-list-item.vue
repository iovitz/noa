<template>
  <uni-list-chat
    :title="userinfo.nickname"
    :avatar-circle="true"
    :avatar="userinfo.avatar"
    :note="props.message"
    time="2020-02-02 20:20"
    badge-positon="left"
    :badge-text="notRead"
    @tap="handleGoChat"
    clickable
  />
</template>
<script setup>
import { useUserInfo } from "@/hooks/userinfo.hook";

const props = defineProps(["timestamp", "message", "userid", "notRead"]);

// 用户信息
const userinfo = useUserInfo(props.userid);

const handleGoChat = () => {
  uni.navigateTo({
    url: "/pages/chat/chat?userid=" + props.userid,
  });
};
</script>

<style lang="scss" scoped></style>

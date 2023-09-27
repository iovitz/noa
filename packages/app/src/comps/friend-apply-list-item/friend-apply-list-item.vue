<template>
  <uni-list-item
    :avatar-circle="true"
    :border="false"
    :title="userinfo.nickname"
    :note="props.desc"
    :thumb="avatar"
    thumb-size="lg"
    class="friend-apply-list-item"
  >
    <template v-slot:footer>
      <view class="flex justify-center items-center">
        <button size="mini" @click="props.handleClick" :disabled="props.pass">
          {{ props.pass ? "已同意" : "同意" }}
        </button>
      </view>
    </template>
  </uni-list-item>
</template>
<script setup>
import { ref, computed } from "vue";
import { useUserInfo } from "@/hooks/userinfo.hook";
import Identicon from "identicon.js";
import MD5 from "md5.js";

const props = defineProps(["pass", "handleClick", "desc", "userid"]);

// 用户信息
const userinfo = ref({
  nickname: "",
});

useUserInfo(props.userid, userinfo);

const avatar = computed(() => {
  return (
    userinfo.value.avatar ??
    "data:image/png;base64," +
      new Identicon(
        new MD5().update(props.userid).digest("hex"),
        420,
      ).toString()
  );
});
</script>

<style lang="scss" scoped>
.friend-apply-list-item {
  :deep(.uni-list-item__icon) {
    border-radius: 50%;
    overflow: hidden;
    height: 40px;
    width: 40px;
  }
}
</style>

<template>
  <CommonPageWrapper title="通知" buttonText="发送申请" :showButton="false">
    <view class="content">
      <FriendApply />
    </view>
  </CommonPageWrapper>
</template>

<script setup>
import CommonPageWrapper from "@/comps/common-page-wrapper/common-page-wrapper.vue";
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { useApplyStore } from "@/store";
import FriendApply from "./friend_apply.vue";
import GroupApply from "./group_apply.vue";

const current = ref(0);

onLoad((data) => {
  if (!data || !data.tab) return;
  current.value = parseInt(data.tab);
});
</script>

<style lang="scss" scoped>
.tabs {
  height: 100upx;
  display: flex;
  align-items: center;
  justify-content: center;
  .tabs-switch {
    width: 600upx;
  }
}
</style>

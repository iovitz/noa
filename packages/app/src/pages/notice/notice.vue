<template>
  <CommonPageWrapper title="通知" buttonText="发送申请" :showButton="false">
    <view class="tabs">
      <uni-segmented-control
        class="tabs-switch"
        :current="current"
        :values="items"
        @clickItem="onClickItem"
      />
    </view>
    <view class="content">
      <view v-if="current === 0">
        <FriendApply />
      </view>
      <view v-if="current === 1">
        <GroupApply />
      </view>
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

const applyStore = useApplyStore();

const current = ref(0);
const items = ref(["新朋友", "群通知"]);

onLoad((data) => {
  if (!data || !data.tab) return;
  current.value = parseInt(data.tab);
});

const onClickItem = (e) => {
  if (current.value !== e.currentIndex) {
    current.value = e.currentIndex;
  }
};
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

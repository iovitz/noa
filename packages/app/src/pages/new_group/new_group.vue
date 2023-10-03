<template>
  <view class="new_group-page">
    <CommonPageWrapper
      title="群名称和群头像"
      buttonText="创建"
      :showButton="true"
      @buttonClick="buttonClick"
    >
      <uni-card :is-shadow="false" :border="false" class="group-name">
        <uni-title color="#767676" type="h4" title="群名称" />
        <uni-easyinput
          class="uni-mt-5"
          trim="all"
          v-model="groupName"
          placeholder="请输入内容"
        ></uni-easyinput>
      </uni-card>
    </CommonPageWrapper>
  </view>
</template>

<script setup>
import CommonPageWrapper from "@/comps/common-page-wrapper/common-page-wrapper.vue";
import { rCreateGroup } from "@/io/http/group";
import { ref } from "vue";

const groupName = ref("");

const buttonClick = () => {
  rCreateGroup(groupName.value, "").then((res) => {
    if (res.code === 0) {
      uni.showToast({
        icon: "success",
        title: "创建群组成功",
        duration: 1000,
      });
    }
    groupName.value = "";
    uni.navigateBack();
  });
};
</script>

<style lang="scss" scoped>
.new_group-page {
  height: 100%;
  width: 100%;
  background-color: #f5f5f5;
}
.group-name {
  background-color: #fff;
  font-size: 24upx;
}
</style>

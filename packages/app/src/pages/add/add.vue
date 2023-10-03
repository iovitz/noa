<template>
  <CommonPageWrapper
    :title="titleText"
    buttonText="发送申请"
    :showButton="true"
    @buttonClick="requestApplyList"
    :buttonDisabled="!!userid"
  >
    <avatar-header
      :avatar="userinfo.avatar"
      :nickname="userinfo.nickname"
      :desc="userid"
    ></avatar-header>
    <uni-group title="填写验证信息">
      <view class="px-4">
        <uni-easyinput
          type="textarea"
          v-model="message"
          placeholder="请输入内容"
        ></uni-easyinput>
      </view>
    </uni-group>
  </CommonPageWrapper>
</template>

<script setup>
import CommonPageWrapper from "@/comps/common-page-wrapper/common-page-wrapper.vue";
import { computed, ref } from "vue";
import AvatarHeader from "@/comps/avatar-header/avatar-header.vue";
import { useLoadUserInfo } from "@/hooks/userinfo.hook";
import { rFriendRequest } from "@/io/http/apply";

const isAddUser = ref(true);

const titleText = computed(() => {
  return isAddUser.value ? "发送好友申请" : "发送群聊申请";
});

const message = ref("");

const { userid, userinfo } = useLoadUserInfo();
const requestApplyList = async () => {
  await rFriendRequest(userid.value, message.value);
  uni.navigateBack();
  uni.showToast({
    icon: "success",
    title: "成功发送申请",
    duration: 1000,
  });
};
</script>

<style lang="scss" scoped></style>

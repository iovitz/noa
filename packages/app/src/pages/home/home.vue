<template>
  <CommonPageWrapper
    title="用户资料"
    :buttonText="isFriend ? '开始聊天' : '添加好友'"
    @buttonClick="buttonClick"
    :show-button="!isMe"
  >
    <avatar-header
      :nickname="userinfo.nickname || '...'"
      :desc="`HAHA号：${userid}`"
      :avatar="userinfo.avatar"
    ></avatar-header>

    <view class="user-info">
      <uni-group type="card" title="签名">
        <uni-list-item
          showArrow
          :border="false"
          clickable
          :title="userinfo.profile?.desc || '这个人很懒，什么也没留下'"
        />
      </uni-group>
      <uni-group type="card" title="个人信息">
        <uni-list-item
          :border="false"
          title="年龄"
          :rightText="userinfo.profile?.birth || '保密'"
        />
        <uni-list-item
          :border="false"
          title="生日"
          :rightText="userinfo.profile?.birth || '保密'"
        />
      </uni-group>
    </view>
    <uni-group type="card" title="空间动态">
      <uni-list-item
        :border="false"
        showArrow
        clickable
        title="他的空间"
        rightText="10条内容"
      />
    </uni-group>
  </CommonPageWrapper>
</template>

<script setup>
import { ref } from "vue";
import CommonPageWrapper from "@/comps/common-page-wrapper/common-page-wrapper.vue";
import logger from "@/utils/logger";
import AvatarHeader from "@/comps/avatar-header/avatar-header.vue";
import { useLoadUserInfo } from "@/hooks";
import { onLoad } from "@dcloudio/uni-app";
import { rGetUserInfo } from "@/io/http/user";
import MD5 from "md5.js";
import Identicon from "identicon.js";
import { useAuthStore } from "@/store";

const authStore = useAuthStore();

// 当前主页的userid
const userid = ref("");
// 用户信息
const userinfo = ref({
  nickname: "",
  avatar: null,
  isFriend: false,
});

// 是不是好友
const isFriend = ref(false);
// 是否是自己的主页
const isMe = ref(true);

const buttonClick = () => {
  if (isFriend.value) {
    uni.redirectTo({
      url: `/pages/chat/chat?userid=${userid.value}`,
    });
  } else {
    uni.redirectTo({
      url: `/pages/add/add?userid=${userid.value}`,
    });
  }
};
onLoad(async (options) => {
  // 拿到需要获取的的userid
  const queryUserid = options?.userid;
  if (!queryUserid) {
    uni.navigateBack();
    return;
  }
  userid.value = queryUserid;

  const data = await rGetUserInfo([queryUserid], true, true);
  const info = data[queryUserid];
  userinfo.value.nickname = info.nickname;
  userinfo.value.avatar =
    info.avatar ??
    "data:image/png;base64," +
      new Identicon(
        new MD5().update(queryUserid).digest("hex"),
        420,
      ).toString();
  isFriend.value = info.isFriend;
  isMe.value = queryUserid === authStore.userid;
});
</script>

<style lang="scss" scoped></style>

<template>
  <CommonPageWrapper title="个人信息">
    <uni-list :border="false">
      <uni-group
        class="user-aside-list-group bg-white"
        type="card"
        title="社交信息"
      >
        <AvatarCell />
        <DescriptionCell />
        <uni-list-item
          :border="false"
          title="HaHa号"
          :rightText="authStore.userid"
        />
        <NicknameCell />
      </uni-group>

      <uni-group
        class="user-aside-list-group bg-white"
        type="card"
        title="个人信息"
      >
        <GenderCell />
        <BirthdayCell />
        <uni-list-item :border="false" title="年龄" rightText="18" />
        <uni-list-item
          :border="false"
          showArrow
          clickable
          title="地区"
          rightText="广东 深圳"
        />
      </uni-group>
    </uni-list>
  </CommonPageWrapper>
</template>

<script setup>
import { ref } from "vue";
import AvatarCell from "./avatar-cell.vue";
import NicknameCell from "./nickname-cell.vue";
import DescriptionCell from "./description-cell.vue";
import GenderCell from "./gender-cell.vue";
import BirthdayCell from "./birthday-cell.vue";
import CommonPageWrapper from "@/comps/common-page-wrapper/common-page-wrapper.vue";
import { useAuthStore } from "@/store";

const authStore = useAuthStore();
</script>

<style lang="scss" scoped></style>

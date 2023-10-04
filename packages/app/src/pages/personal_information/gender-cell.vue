<template>
  <uni-list-item
    :border="false"
    showArrow
    clickable
    title="性别"
    rightText="男"
    @click="handleChooseGenderOpen"
  />
  <uni-popup ref="chooseGenderRef" type="bottom">
    <view class="choose-gender">
      <view class="popup-header">
        <button
          class="confirm-button mr-4"
          type="primary"
          size="mini"
          @click="handleConfirmGenderChange"
        >
          确认
        </button>
      </view>
      <picker-view
        class="choose-gender-picker"
        @change="handleGenderChange"
        :value="genderValue"
      >
        <picker-view-column>
          <view class="item" v-for="(item, index) in maleList" :key="index">{{
            item
          }}</view>
        </picker-view-column>
      </picker-view>
    </view>
  </uni-popup>
</template>
<script setup>
import { useAuthStore } from "@/store";
import { ref } from "vue";
const authStore = useAuthStore();
const maleList = ["男", "女", "保密"];

const chooseGenderRef = ref();
const genderValue = ref([1]);
const handleGenderChange = (e) => {
  genderValue.value = e.detail.value;
};
const handleChooseGenderOpen = () => {
  chooseGenderRef.value?.open();
};

const handleConfirmGenderChange = () => {
  chooseGenderRef.value?.close();
  const value = genderValue.value[0];
};
</script>
<style lang="scss" scoped>
.choose-gender {
  height: 600upx;
  background-color: #fff;
  .popup-header {
    height: 100upx;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  &-picker {
    height: 500upx;
    text-align: center;
  }
}
</style>

<template>
  <uni-list-item
    :border="false"
    showArrow
    clickable
    title="生日"
    :rightText="birthDay"
    @click="handlePickBirthday"
  />
  <view class="hidden-block">
    <uni-datetime-picker
      v-model="birthDay"
      type="date"
      ref="datePickerRef"
      start="1970-1-1 00:00:00"
      end="2023-1-1 00:00:00"
      @change="handleBirthdayChange"
    />
  </view>
</template>
<script setup>
import { ref } from "vue";
const datePickerRef = ref();

const birthDay = ref("2021-04-3");
const handlePickBirthday = () => {
  datePickerRef.value?.show();
};
const handleBirthdayChange = (e) => {
  birthDay.value = e;
};
</script>
<style lang="scss" scoped>
.hidden-block {
  height: 0px;
  width: 0px;
  overflow: hidden;
}
</style>

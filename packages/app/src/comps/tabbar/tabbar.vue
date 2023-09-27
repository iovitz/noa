<template>
  <view class="tab-bar">
    <view
      class="tab-bar__item"
      v-for="(item, idx) in tabItems"
      @click="() => handleSwitchTab(idx)"
      :key="idx"
    >
      <image class="tab-bar__icon" mode="aspectFit" :src="item.icon"></image>
      <view class="tab-bar__text"> {{ item.name }} </view>
    </view>
  </view>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    tabItems: {
      type: Array,
      default: () => [],
    },
    modelValue: {
      type,
      default: 0,
    },
  },
  methods: {
    handleSwitchTab(idx) {
      this.$emit("update:modelValue", idx);
    },
  },
});
</script>

<style lang="scss" scoped>
.tab-bar {
  height: 100upx;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  &__item {
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6upx;
  }
  &__icon {
    height: 50upx;
    width: 50upx;
  }
  &__text {
    font-size: 24upx;
  }
}
</style>

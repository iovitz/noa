<template>
  <view class="default-page">
    <image
      :src="`https://common-1005.oss-cn-beijing.aliyuncs.com/static/default/uview/${props.type}.png`"
    >
    </image>
  </view>
</template>
<script setup>
const props = defineProps(["type", "text"]);
</script>

<style lang="scss" scoped>
.default-page {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

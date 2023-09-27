<template>
  <view class="empty-status-wrapper"> 内容为空 </view>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    type: {
      type: String,
    },
  },
  computed: {
    iconUrl() {
      return `http://cdn.uviewui.com/uview/empty/${this.type}.png`;
    },
  },
});
</script>

<style lang="scss" scoped>
.empty-status-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

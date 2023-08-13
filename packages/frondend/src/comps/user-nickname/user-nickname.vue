<template>
  <view> 内容为空 </view>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    type: String,
  },
  computed: {
    iconUrl() {
      return `http://cdn.uviewui.com/uview/empty/${this.type}.png`
    },
  },
})
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

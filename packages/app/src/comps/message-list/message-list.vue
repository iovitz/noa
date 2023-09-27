<template>
  <uni-list :border="false">
    <uni-swipe-action>
      <uni-swipe-action-item :right-options="options" v-for="i in 20" :key="i">
        <uni-list-chat
          title="xieqianyu"
          :avatar-circle="true"
          avatar="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
          note="您收到一条新的消息"
          time="2020-02-02 20:20"
          badge-positon="left"
          badge-text="99"
          @tap="handleGoChat"
          clickable
        />
      </uni-swipe-action-item>
    </uni-swipe-action>
  </uni-list>
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
  data() {
    return {
      options: [
        {
          text: "置顶",
          style: {
            backgroundColor: "#007aff",
          },
        },
        {
          text: "删除",
          style: {
            backgroundColor: "#dd524d",
          },
        },
      ],
    };
  },
  methods: {
    handleGoChat() {
      uni.navigateTo({
        url: "/pages/chat/chat",
      });
    },
  },
});
</script>
<style lang="scss" scoped></style>

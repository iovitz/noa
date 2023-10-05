<template>
  <Default
    v-if="chatStore.chatList.length === 0"
    style="padding-top: 200upx"
    type="message"
    title="消息"
  />
  <uni-list v-else :border="false">
    <uni-swipe-action>
      <uni-swipe-action-item
        :right-options="options"
        v-for="item in chatStore.chatList"
        :key="item.targetid"
        @click="(e) => bindClick(e, item.targetid)"
      >
        <MessageListItem
          :userid="item.targetid"
          :timestamp="item.timestamp"
          :message="item.message"
          :notRead="item.notRead"
        />
      </uni-swipe-action-item>
    </uni-swipe-action>
  </uni-list>
</template>
<script setup>
import { useChatStore } from "@/store";
import { ref } from "vue";
import Default from "@/comps/default/default.vue";
import MessageListItem from "@/comps/message-list-item/message-list-item";

const chatStore = useChatStore();

const options = ref([
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
]);

const bindClick = (e, targetid) => {
  if (e.content.text === "删除") {
    // 从消息列表中删除
    chatStore.delectFromChatList(targetid);
  }
};
</script>
<style lang="scss" scoped></style>

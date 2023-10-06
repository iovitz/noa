<template>
  <!-- <EmptyStatus type="message"></EmptyStatus> -->
  <view class="chat-page">
    <uni-nav-bar
      dark
      class="text-white"
      left-icon="left"
      right-icon="person"
      title="聊天"
      :border="false"
      leftWidth="70upx"
      rightWidth="70upx"
      height="100upx"
      status-bar
      background-color="#575170"
      :fixed="true"
      @clickLeft="handleBackup"
      @clickRight="handleOpenUser"
    />

    <ChatMessageList
      :messageList="chatStore.currentChatMessages"
      :scroll-height="scrollHeight"
    ></ChatMessageList>
    <!-- <view class="chat-message-container"> 22</view> -->
    <view
      :class="classNames(['chat-input-container', inputFocus && 'focus'])"
      :style="`bottom: ${keyboardheightchange}px`"
    >
      <button class="sound-button" size="mini">
        <uni-icons type="mic" size="28"></uni-icons>
      </button>

      <textarea
        class="message-input"
        v-model="inputValue"
        @input="handleInput"
        :fixed="true"
        :auto-blur="true"
        @focus="handleInputFocus"
        @blur="handleInputBlur"
        :hold-keyboard="true"
        @keyboardheightchange="keyboardheightchange"
      />

      <button
        class="send-button"
        type="primary"
        @tap="handleSendMessage"
        size="mini"
        :disabled="!inputValue"
      >
        发送
      </button>
    </view>
  </view>
</template>

<script setup>
import logger from "@/utils/logger";
import classNames from "classnames";
import ChatMessageList from "@/comps/chat-message-list/chat-message-list.vue";
import { computed, ref, onMounted } from "vue";
import { useChatStore } from "@/store";
import { onLoad, onUnload } from "@dcloudio/uni-app";

const chatStore = useChatStore();

const targetId = ref("");

const inputValue = ref("");
const inputFocus = ref(false);

function handleInput(e) {
  logger.verbose("input", e);
}

const handleBackup = () => {
  uni.navigateBack();
};

const handleInputFocus = () => {
  logger.verbose("输入框Focus");
  inputFocus.value = true;
  inputHeight.value = uni.upx2px(180);
};
const handleInputBlur = () => {
  logger.verbose("输入框Blur");
  inputFocus.value = false;
  inputHeight.value = uni.upx2px(100);
  // keyboardHeight.value = 0
};

const handleOpenUser = () => {
  logger.verbose("打开用户界面");
  uni.navigateTo({
    url: "/pages/home/home?userid=" + targetId.value,
  });
};

const windowHeight = ref(0);
const inputHeight = ref(uni.upx2px(100));
const keyboardHeight = ref(0);
const scrollHeight = computed(() => {
  return windowHeight.value - inputHeight.value - keyboardHeight.value;
});

// 键盘弹起事件
const keyboardheightchange = (res) => {
  keyboardHeight.value = res.detail?.height ?? 0;
};
onMounted(() => {
  uni.getSystemInfo({
    success: (res) => {
      windowHeight.value =
        (res.safeArea?.height ||
          res.windowHeight - (res.statusBarHeight ?? 0)) -
        res.windowBottom -
        uni.upx2px(100);
      logger.verbose("窗口高度", windowHeight.value);
    },
  });
});

onUnload(() => {
  chatStore.handleChatEnd();
});

onLoad(async (options) => {
  // 拿到需要获取的的userid
  const queryUserid = options?.userid;
  if (!queryUserid) {
    uni.navigateBack();
    return;
  }
  targetId.value = queryUserid;
  chatStore.handleChatStart(queryUserid);
  chatStore;
});

const scrollTop = ref(Number.MAX_SAFE_INTEGER);
const handleSendMessage = () => {
  chatStore.handleTextMessage(targetId.value, inputValue.value);
  inputValue.value = "";
  scrollTop.value = Number.MAX_SAFE_INTEGER;
};
</script>

<style lang="scss" scoped>
.chat-page {
  height: 100%;
  width: 100%;
  .chat-message-container {
    flex: 1;
    line-height: 100upx;
    background-color: #f5f5f5;
  }
  .chat-input-container {
    position: fixed;
    height: 100upx;
    padding: 20upx;
    box-sizing: border-box;
    left: 0;
    right: 0;
    display: flex;
    align-items: flex-end;
    background-color: #ffffff;
    &.focus {
      height: 180upx;
      .message-input {
        height: 140upx;
      }
    }
    .message-input {
      height: 60upx;
      line-height: 40upx;
      flex: 1;
      padding: 10upx;
      background-color: #f5f5f5;
      box-sizing: border-box;
    }
    .sound-button {
      padding: 0;
      line-height: 60upx;
      width: 60upx;
      margin-right: 10upx;
      position: relative;
      justify-content: center;
      align-items: center;
      display: flex;
      background-color: inherit;
    }
    .send-button {
      margin-left: 10upx;
      display: flex;
      height: 60upx;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>

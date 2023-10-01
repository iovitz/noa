<template lang="">
  <uni-popup ref="alertDialog" type="dialog">
    <uni-popup-dialog
      :type="options.type ?? 'info'"
      mode="base"
      :cancelText="cancelText ?? '取消'"
      :confirmText="confirmText ?? '确认'"
      :title="options.title ?? '提示'"
      :content="options.content ?? '提示'"
      @confirm="dialogConfirm"
      @close="dialogClose"
    ></uni-popup-dialog>
  </uni-popup>
</template>
<script setup>
import { ref } from "vue";
import { onLoad, onUnload } from "@dcloudio/uni-app";
import { EventName } from "@/common/const/event_name_const.ts";
const options = ref({});

const dialogClose = () => {
  options.value = {};
  options.value.close();
};
const dialogConfirm = () => {
  options.value.confirm();
};

const handleGlobalDialogEvent = (ops) => {
  options.value = {
    ...options.value,
    ...ops,
  };
};

onLoad(() => {
  uni.$on(EventName.GlobalDialog, handleGlobalDialogEvent);
});
onUnload(() => {
  uni.$off(EventName.GlobalDialog, handleGlobalDialogEvent);
});
</script>

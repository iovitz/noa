<template lang="">
  <uni-popup ref="alertDialog" type="dialog">
    <uni-popup-dialog
      :type="msgType"
      cancelText="关闭"
      confirmText="同意"
      title="通知"
      content="欢迎使用 uni-popup!"
      @confirm="dialogConfirm"
      @close="dialogClose"
    ></uni-popup-dialog>
  </uni-popup>
</template>
<script setup></script>

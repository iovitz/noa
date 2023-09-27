<template>
  <view class="login-page">
    <view class="login-wrapper">
      <Login v-if="loginType === 'login'"></Login>
      <Register v-if="loginType === 'register'"></Register>
      <view class="options">
        <a @tap="handleSwitchLoginType">
          {{ loginType === "login" ? "立即注册" : "返回登陆" }}</a
        >
        | <a>登录遇到问题</a>
      </view>
    </view>
  </view>
</template>

<script setup>
import Register from "./register.vue";
import Login from "./login.vue";
import { ref } from "vue";
const loginType = ref("login");

const handleSwitchLoginType = () => {
  if (loginType.value === "login") {
    loginType.value = "register";
  } else {
    loginType.value = "login";
  }
};
</script>

<style lang="scss" scoped>
.login-page {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: start;
  flex-direction: column;
  background-color: #fff;
  box-sizing: border-box;
  padding: 100upx;
}
.login-wrapper {
  width: 100%;
}
.login-title {
  font-size: 60upx;
  text-align: center;
  margin-bottom: 60upx;
}
.login-input-wrapper {
  margin-bottom: 30upx;
}
.options {
  margin-top: 100upx;
  text-align: center;
  & > text {
    color: #e15f41;
  }
}
</style>

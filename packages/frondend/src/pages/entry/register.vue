<template>
  <view class="login-title">注册</view>
  <view class="login-input-wrapper">
    <uni-forms ref="formRef" :rules="registerRules" :modelValue="formData">
      <uni-forms-item name="nickname">
        <uni-easyinput v-model="formData.nickname" placeholder="昵称" />
      </uni-forms-item>
      <uni-forms-item name="username">
        <uni-easyinput v-model="formData.username" placeholder="HAHA号" />
      </uni-forms-item>
      <uni-forms-item name="password">
        <uni-easyinput v-model="formData.password" type="password" placeholder="密码" />
      </uni-forms-item>
      <uni-forms-item name="repeat">
        <uni-easyinput v-model="formData.repeat" type="password" placeholder="重复密码" />
      </uni-forms-item>
    </uni-forms>
  </view>
  <button type="primary" @tap="handleSubmit">登录</button>
</template>

<script lang="ts" setup>
import { registerRules } from '@/common/rules/login'
import { rRegister } from '@/io/http/auth'
import { useAuthStore } from '@/store'
import logger from '@/utils/logger'
import { storage } from '@/utils/storage'
import { ref, reactive } from 'vue'

const authStore = useAuthStore()

const formRef = ref()

const formData = reactive({
  nickname: '',
  username: '',
  password: '',
  repeat: '',
})
const handleSubmit = async () => {
  const { nickname, username, password } = await formRef.value.validate()
  await authStore.register(nickname, username, password)
}
</script>

<style lang="scss" scoped>
.login-title {
  font-size: 1.5em;
  text-align: center;
  margin-bottom: 100upx;
}
.login-input-wrapper {
  margin-bottom: 100upx;
}
</style>
@/io/http/auth @/store

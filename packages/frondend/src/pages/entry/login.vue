<template>
  <view class="login-title">登录</view>
  <view class="login-input-wrapper">
    <uni-forms ref="sectionRef" :rules="loginRules" :modelValue="formData">
      <uni-forms-item name="username">
        <uni-easyinput v-model="formData.username" placeholder="HAHA号" />
      </uni-forms-item>
      <uni-forms-item name="password">
        <uni-easyinput v-model="formData.password" type="password" placeholder="密码" />
      </uni-forms-item>
    </uni-forms>
  </view>

  <button type="primary" @tap="handleSubmit">登录</button>
</template>

<script lang="ts" setup>
import { rLogin } from '@/io/http/user'
import { reactive, ref } from 'vue'
import { useUserStore } from '@/store/user.store'
import { loginRules } from '@/common/rules/login'
const sectionRef = ref()

const userStore = useUserStore()

const formData = reactive({
  username: '',
  password: '',
})

const handleSubmit = async () => {
  const res = await sectionRef.value.validate()
  await userStore.login(res.username, res.password)
  setTimeout(() => {
    uni.switchTab({
      url: '/pages/message/message',
    })
  }, 1000)
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

<template>
	<view class="login-title">注册</view>
	<view class="login-input-wrapper">
		<uni-forms ref="formRef" :rules="registerRules" :modelValue="formData">
			<uni-forms-item label="昵称" required name="nickname">
				<uni-easyinput v-model="formData.nickname" placeholder="昵称" />
			</uni-forms-item>
			<uni-forms-item label="账号" required name="username">
				<uni-easyinput v-model="formData.username" placeholder="账号" />
			</uni-forms-item>
			<uni-forms-item label="密码" required name="password">
				<uni-easyinput v-model="formData.password" type="password" placeholder="密码" />
			</uni-forms-item>
			<uni-forms-item label="重复" required name="repeat">
				<uni-easyinput v-model="formData.repeat" type="password" placeholder="重复密码" />
			</uni-forms-item>
		</uni-forms>
	</view>
	<button type="primary" @tap="handleSubmit">登录</button>
</template>

<script lang="ts" setup>
import { registerRules } from '@/common/rules/login';
import { rRegister } from '@/io/http/user';
import { useUserStore } from '@/store/user.store';
import { ref, reactive } from 'vue';

const userStore = useUserStore();

const formRef = ref();

const formData = reactive({
	nickname: '',
	username: '',
	password: '',
	repeat: '',
});
const handleSubmit = () => {
	formRef.value.validate().then((res: any) => {
		rRegister(res.nickname, res.username, res.password).then((res: any) => {
			if (res.code === 0) {
				console.log(res);
				uni.showToast({
					title: '注册成功，即将自动登录',
					duration: 2000,
					icon: 'success',
				});
				userStore.$patch({
					nickname: res.nickmame,
					gender: res.gender,
					description: res.description,
				});

				setTimeout(() => {
					uni.switchTab({
						url: '/pages/discover/discover',
					});
				}, 1000);
			}
		});
	});
};
</script>

<style lang="scss" scoped>
.login-title {
	font-size: 60upx;
	text-align: center;
	margin-bottom: 60upx;
}
.login-input-wrapper {
	margin-bottom: 30upx;
}
</style>

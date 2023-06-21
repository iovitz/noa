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
import { rLogin } from '@/io/http/user';
import { reactive, ref } from 'vue';
import { useUserStore } from '@/store/user.store';
import { loginRules } from '@/common/rules/login';
import { storage } from '@/utils/storage/storage';
const sectionRef = ref();

const userStore = useUserStore();

const formData = reactive({
	username: '',
	password: '',
});

const handleSubmit = () => {
	sectionRef.value.validate().then((res: any) => {
		rLogin(res.username, res.password).then(({ code, data }) => {
			if (code === 0) {
				uni.showToast({
					title: '登录成功，正在跳转',
					duration: 2000,
					icon: 'success',
				});
				userStore.$patch({
					username: data.username,
					nickname: data.nickname,
					avatar: data.avatar,
					gender: data.gender,
					description: data.description,
				});
				console.log(data.nickname, data.avatar, data.gender);
				storage.set('token', data.token);
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
	font-size: 1.5em;
	text-align: center;
	margin-bottom: 100upx;
}
.login-input-wrapper {
	margin-bottom: 100upx;
}
</style>

<template>
	<PageWithBottonButton :title="titleText" buttonText="发送申请"> </PageWithBottonButton>
</template>

<script lang="ts" setup>
import PageWithBottonButton from '@/comps/page-with-bottom-button/page-with-bottom-button.vue';
import { computed, ref } from 'vue';

const isAddUser = ref(true);

const titleText = computed(() => {
	return isAddUser.value ? '发送好友申请' : '发送群聊申请';
});
</script>

<style lang="scss" scoped></style>

<template>
	<view class="uni-uploader">
		<view class="uni-uploader-head">
			<view class="uni-uploader-title">点击可预览选好的图片</view>
			<view class="uni-uploader-info">{{ imageList.length }}/9</view>
		</view>
		<uni-grid :column="gridColumn">
			<uni-grid-item v-for="(image, index) in imageList" :key="index">
				<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
			</uni-grid-item>
			<uni-grid-item v-if="isShowAddButton">
				<view class="uni-uploader__input-box">
					<view class="uni-uploader__input" @tap="chooseImage"></view>
				</view>
			</uni-grid-item>
		</uni-grid>
	</view>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	props: {
		gridColumn: {
			type: Number,
			default: 3,
		},
		max: {
			type: Number,
			default: 9,
		},
	},
	data() {
		return {
			title: 'choose/previewImage',
			imageList: [] as string[],
		};
	},
	computed: {
		isShowAddButton() {
			return this.imageList.length < this.max;
		},
	},
	onUnload() {
		this.imageList = [];
	},
	methods: {
		chooseImage: async function () {
			uni.chooseImage({
				sourceType: ['album'],
				sizeType: ['original', 'compressed'],
				count: this.max,
				success: ({ tempFilePaths }) => {
					const paths = typeof tempFilePaths === 'string' ? [tempFilePaths] : tempFilePaths;
					this.imageList = [...this.imageList, ...paths];
				},
				fail: (err) => {
					console.log('上传失败', err);
				},
			});
		},

		previewImage: function (e: any) {
			const current = e.target.dataset.src;
			uni.previewImage({
				current,
				urls: this.imageList,
			});
		},
	},
});
</script>

<style lang="scss" scoped></style>

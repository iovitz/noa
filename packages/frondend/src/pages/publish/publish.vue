<template>
	<view class="publish-page">
		<uni-nav-bar left-icon="left" title="返回" @clickLeft="handleBack" />
		<view class="content-editor">
			<textarea
				class="editor"
				type="textarea"
				v-model="content"
				maxlength="1000"
				placeholder="请输入自我介绍"
			/>
		</view>

		<view class="upload-image">
			<UploadImage :grid-column="3" :max="9"></UploadImage>
		</view>

		<view class="bottom-operations">
			<view class="options-icons">
				<view class="options-icon">
					<text class="iconfont icon-classify_1_line" />
				</view>
				<view class="options-icon">
					<text class="iconfont icon-topic" />
				</view>
				<view class="options-icon">
					<text class="iconfont icon-pic_line" />
				</view>
			</view>
			<button class="publish-button" type="primary" size="mini">发布</button>
		</view>
	</view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UploadImage from '@/comps/upload-image/upload-image.vue';

export default defineComponent({
	components: {
		UploadImage,
	},
	data() {
		return {
			content: '',
			fileList: [] as any[],
		};
	},
	methods: {
		handleUploadImage(e: any) {
			const files = e.file ?? [];
			this.fileList = [...this.fileList, ...files];
		},
		handleDeleteImage() {
			console.log('删除图片');
		},
		handleBack() {
			uni.navigateBack();
		},
	},
});
</script>

<style lang="scss" scoped>
.publish-page {
	height: 100%;
	width: 100%;
	background-color: #fff;
	.content-editor {
		.editor {
			width: 100%;
			padding: 30upx;
			box-sizing: border-box;
		}
	}
	.upload-image {
		padding: 30upx;
	}
	.bottom-operations {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 30upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.options-icons {
			display: flex;
			.options-icon {
				height: 60upx;
				width: 60upx;
				display: flex;
				margin-right: 20upx;
				display: flex;
				align-items: center;
				justify-content: center;
				.iconfont {
					font-size: 40upx;
				}
			}
		}
		.publish-button {
			margin: 0;
		}
	}
}
</style>

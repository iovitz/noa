<template>
	<view class="news-card-wrapper">
		<view class="card-header">
			<view class="avatar" @tap="handleOpenHome">
				<image class="avatar-iamge" src="https://web-assets.dcloud.net.cn/unidoc/zh/hx.png"></image>
			</view>
			<view class="author">
				<text class="nickname">钢盆的勇气</text>
				<text class="time">2023.3.1</text>
			</view>
			<view>
				<uni-fav :checked="notFollow" :content-text="followText" @tap="handleFollow" />
			</view>
		</view>
		<view class="card-body">
			<view class="content" @tap="handleDetail">
				就斤斤计较斤斤计较斤斤计较斤斤计较斤斤计较斤斤计较斤斤计较斤斤计较斤斤计较斤斤计较斤斤计较姐法就斤斤计较斤斤计较斤斤计较斤
			</view>
			<view
				class="image"
				@tap="handleImage"
				:style="{
					backgroundImage: 'url(https://s1.ax1x.com/2023/04/03/pp4Fug1.jpg)',
				}"
			>
			</view>
		</view>
		<view class="card-footer">
			<view class="options">
				<view class="option" @tap="handleLike">
					<text class="iconfont icon-thumb_up_line" />
					<text class="count">{{ 2 }}</text>
				</view>
				<view class="option" @tap="handleDislike">
					<text class="iconfont icon-thumb_down_line" />
					<text class="count">{{ 2 }}</text>
				</view>
				<view class="option" @tap="handleGoComment">
					<text class="iconfont icon-comment_2_line" />
					<text class="count">{{ 2 }}</text>
				</view>
				<view class="option" @tap="handleShear">
					<text class="iconfont icon-share" />
					<text class="count">{{ 2 }}</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script lang="ts">
import logger from '@/utils/logger';
import { defineComponent } from 'vue';

export default defineComponent({
	data() {
		return {
			notFollow: true,
			followText: { contentDefault: '已关注', contentFav: '关注' },
		};
	},
	methods: {
		handleFollow() {
			this.notFollow = !this.notFollow;
		},
		handleOpenHome() {
			logger.verbose('打开个人空间');
		},
		handleDetail() {
			logger.verbose('查看详情');
		},
		handleGoComment() {
			logger.verbose('查看评论');
		},
		handleImage() {
			logger.verbose('查看图片');
		},
		handleShear() {
			logger.verbose('分享');
		},
		handleLike() {
			logger.verbose('喜欢');
		},
		handleDislike() {
			logger.verbose('不喜欢');
		},
	},
});
</script>
<style lang="scss" scoped>
.news-card-wrapper {
	background-color: #fff;
	padding: 30upx;
	box-sizing: border-box;
	border-bottom: 1px solid #eee;
	.card-header {
		display: flex;
		align-items: center;
		.avatar {
			margin-right: 20upx;
			height: 60upx;
			width: 60upx;
			.avatar-iamge {
				height: 100%;
				width: 100%;
				border-radius: 50%;
			}
		}
		.author {
			display: flex;
			flex: 1;
			flex-direction: column;
			.nickname {
				font-weight: bold;
				font-size: 24upx;
			}
			.time {
				color: #aaa;
				font-size: 20upx;
				margin-top: 4upx;
			}
		}
	}
	.card-body {
		padding-top: 20rpx;
		.content {
			font-size: 28upx;
			line-height: 1.5;
		}
		.image {
			margin-top: 20rpx;
			height: 400upx;
			background-position: center center;
		}
	}
	.card-footer {
		.options {
			display: flex;
			.option {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 0.5em;
				padding: 0.5em;
				font-size: 28upx;
				line-height: 1;
				font-weight: bold;
				.iconfont {
					margin-right: 6upx;
				}
				.count {
					position: relative;
					top: 2upx;
				}
			}
		}
	}
}
</style>

<template>
  <view class="uploader">
    <view class="uploader-head">
      <view class="uploader-title">点击可预览选好的图片</view>
      <view class="uploader-info">{{ modelValue.length }}/9</view>
    </view>
    <uni-grid :column="gridColumn" :showBorder="false">
      <uni-grid-item class="image-list-item" v-for="(image, index) in modelValue" :key="index">
        <image
          class="uploader__img"
          mode="aspectFill"
          :src="image"
          :data-src="image"
          @tap="previewImage"
        ></image>
      </uni-grid-item>
      <uni-grid-item v-if="isShowAddButton">
        <view class="uploader__input-box">
          <view class="uploader__input" @tap="chooseImage"></view>
        </view>
      </uni-grid-item>
    </uni-grid>
  </view>
</template>
<script lang="ts">
import logger from '@/utils/logger'
import { defineComponent } from 'vue'
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
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      title: 'choose/previewImage',
    }
  },
  computed: {
    isShowAddButton() {
      return this.modelValue.length < this.max
    },
  },
  methods: {
    chooseImage: async function () {
      uni.chooseImage({
        sourceType: ['album'],
        sizeType: ['original', 'compressed'],
        count: this.max,
        success: ({ tempFilePaths }) => {
          const paths = typeof tempFilePaths === 'string' ? [tempFilePaths] : tempFilePaths
          this.$emit('update:modelValue', [...this.modelValue, ...paths])
        },
        fail: (err) => {
          logger.error('上传图片失败', err)
        },
      })
    },

    previewImage: function (e: any) {
      const current = e.target.dataset.src
      uni.previewImage({
        current,
        urls: this.modelValue as any[],
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.uploader-title {
  color: #aaaaaa;
}
.uploader-head {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 24upx;
  margin-bottom: 10upx;
}
.uploader {
  flex: 1;
  flex-direction: column;
}
.image-list-item {
  position: relative;
}
.uploader-info {
  color: #b2b2b2;
}
.uploader-body {
  margin-top: 16rpx;
}
.uploader__files {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.uploader__file {
  margin: 10rpx;
  width: 210rpx;
  height: 210rpx;
}
.uploader__img {
  display: block;
  width: 100%;
  height: 100%;
}
.uploader__input-box {
  position: relative;
  width: 100%;
  height: 100%;
}
.uploader__input-box:before,
.uploader__input-box:after {
  content: ' ';
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: #d9d9d9;
}
.uploader__input-box:before {
  width: 4rpx;
  height: 79rpx;
}
.uploader__input-box:after {
  width: 79rpx;
  height: 4rpx;
}
.uploader__input-box:active {
  border-color: #999999;
}
.uploader__input-box:active:before,
.uploader__input-box:active:after {
  background-color: #999999;
}
.uploader__input {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
</style>

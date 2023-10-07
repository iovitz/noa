<template>
  <view class="uploader">
    <view class="uploader-head">
      <view class="uploader-title">点击可预览选好的图片</view>
      <view class="uploader-info">{{ modelValue.length }}/9</view>
    </view>
    <uni-grid :column="gridColumn" :showBorder="false">
      <uni-grid-item
        class="image-list-item"
        v-for="(image, index) in modelValue"
        :key="index"
      >
        <image
          class="uploader__img"
          mode="aspectFill"
          :src="image.path"
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
<script>
import logger from "@/utils/logger";
import { defineComponent } from "vue";
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
    fileTypes: {
      type: Array,
      default: () => [".png", ".jpg", ".jpeg"],
    },
    maxSize: {
      type: Number,
      default: 1,
    },
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      title: "choose/previewImage",
    };
  },
  computed: {
    isShowAddButton() {
      return this.modelValue.length < this.max;
    },
  },
  methods: {
    chooseImage: async function () {
      uni.chooseImage({
        sourceType: ["album"],
        sizeType: ["original", "compressed"],
        count: this.max,
        success: ({ tempFiles }) => {
          const files = Array.isArray(tempFiles) ? tempFiles : [tempFiles];
          // 校验图片大小
          if (files.some((file) => file.size / 1024 / 1024 > this.maxSize)) {
            uni.showToast({
              icon: "error",
              title: `图片大小不能超过${this.maxSize}M`,
            });
            return;
          }
          // 校验图片格式
          if (
            files.some((file) => {
              const exet = file.name.substring(file.name.lastIndexOf(".") || 0);
              // 扩展名检查
              return !this.fileTypes.includes(exet.toLowerCase());
            })
          ) {
            uni.showToast({
              icon: "error",
              title: `仅支持${this.fileTypes.join(",")}格式的图片`,
            });
            return;
          }
          this.$emit("update:modelValue", [...this.modelValue, ...files]);
        },
        fail: (err) => {
          logger.error("上传图片失败", err);
        },
      });
    },

    previewImage: function (e) {
      const current = e.target.dataset.src;
      uni.previewImage({
        current: current.path,
        urls: this.modelValue.map((f) => f.path),
      });
    },
  },
});
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
  content: " ";
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

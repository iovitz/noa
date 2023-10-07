<template>
  <CommonPageWrapper
    title="发布哈哈"
    buttonText="发布哈哈"
    :showButton="true"
    @button-click="handlePublish"
  >
    <view class="content-editor">
      <textarea
        class="editor"
        type="textarea"
        v-model="content"
        maxlength="1000"
        placeholder="嚯嚯嚯"
        placeholder-style="color: #aaa"
      />
      <UploadImage v-model="imageList"></UploadImage>
    </view>

    <uni-list-item showArrow :border="false" clickable title="权限设置" />
  </CommonPageWrapper>
</template>

<script setup>
import { ref } from "vue";
import CommonPageWrapper from "@/comps/common-page-wrapper/common-page-wrapper.vue";
import UploadImage from "@/comps/upload-image/upload-image.vue";
import { v4 as uuidv4 } from "uuid";
import logger from "@/utils/logger";
import { rPublishMoment } from "@/io/http/moment";
import { rGetSTSKey } from "@/io/http/oss";
const content = ref("");
const imageList = ref([]);

async function handlePublish() {
  logger.verbose("发布内容", {
    content: content.value,
    imageList: imageList.value,
  });
  const data = await rGetSTSKey();
  const OSSUrl = import.meta.env.VITE_OSS_URL;
  const pathList = [];
  const promises = imageList.value.map((file) => {
    const path = `${
      import.meta.env.VITE_OSS_MOMENT_IMAGES_FOLDER
    }${uuidv4()}${file.name.substring(file.name.lastIndexOf(".") || 0)}`;
    pathList.push(path);
    return new Promise((success, fail) => {
      uni.uploadFile({
        url: OSSUrl,
        filePath: file.path,
        name: "file",
        fileType: "image",
        success,
        formData: {
          name: path,
          key: path,
          "x-oss-security-token": data.SecurityToken,
        },
        fail,
      });
    });
  });
  await Promise.all(promises);
  uni.showLoading({
    title: "正在发表中",
  });
  rPublishMoment(content.value, pathList)
    .catch(() => {
      uni.hideLoading();
    })
    .then((res) => {
      uni.hideLoading();
    });
}
</script>

<style lang="scss" scoped>
.content-editor {
  background-color: #ffffff;
  padding: 30upx;
  .editor {
    width: 100%;
    box-sizing: border-box;
    font-size: 28upx;
    line-height: 1.5em;
    height: 200upx;
    margin-bottom: 30upx;
  }
}
</style>

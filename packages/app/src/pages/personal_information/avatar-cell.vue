<template>
  <uni-list-item
    showArrow
    :border="false"
    clickable
    title="头像"
    link
    @click="handleSwitchAvatarImage"
  >
    <template #footer>
      <image
        class="avatar-image"
        :src="authStore.avatar"
        mode="widthFix"
      ></image> </template
  ></uni-list-item>
</template>
<script setup>
import { rGetSTSKey } from "@/io/http/oss";
import { rPutUserInfo } from "@/io/http/user";
import { useAuthStore } from "@/store";
import logger from "@/utils/logger";
import { v4 as uuidv4 } from "uuid";

const authStore = useAuthStore();

const handleSwitchAvatarImage = () => {
  // 上传头像
  uni.chooseImage({
    count: 1,
    async success(res) {
      const file = res.tempFiles[0];
      if (!file) return;
      const exet = file.name.substring(file.name.lastIndexOf(".") || 0);
      // 扩展名检查
      if (![".png", ".jpg", ".jpeg"].includes(exet.toLowerCase())) {
        uni.showToast({
          icon: "error",
          title: "请上传格式为png、jpg、jpeg",
        });
        return;
      }
      // 大小检查
      if (file.size / 1024 / 1024 > 1) {
        uni.showToast({
          icon: "error",
          title: "头像大小不能超过1M",
        });
        return;
      }

      // loading
      uni.showLoading({
        title: "正在上传头像",
        mask: true,
      });

      const data = await rGetSTSKey();
      const OSSUrl = import.meta.env.VITE_OSS_URL;

      // 组装文件在OSS中的存储路径
      const path = `${
        import.meta.env.VITE_OSS_AVATARS_FOLDER
      }${uuidv4()}${file.name.substring(file.name.lastIndexOf(".") || 0)}`;

      const fullPath = OSSUrl + "/" + path;
      uni.uploadFile({
        url: OSSUrl,
        filePath: file.path,
        name: "file",
        fileType: "image",
        async success(res) {
          logger.verbose("上传头像成功", res);
          await authStore.updateUserInfo({
            avatar: fullPath,
          });
          uni.hideLoading();
          uni.showToast({
            icon: "success",
            title: "头像上传成功",
          });
        },
        formData: {
          name: path,
          key: path,
          "x-oss-security-token": data.SecurityToken,
        },
        fail(e) {
          uni.hideLoading();
          logger.error("图片上传失败", e);
        },
      });
    },
  });
};
</script>
<style lang="scss" scoped>
.avatar-image {
  height: 80upx;
  width: 80upx;
}
</style>

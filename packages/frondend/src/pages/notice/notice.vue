<template>
  <CommonPageWrapper title="通知" buttonText="发送申请" :showButton="false">
    <view class="tabs">
      <uni-segmented-control
        class="tabs-switch"
        :current="current"
        :values="items"
        @clickItem="onClickItem"
      />
    </view>
    <view class="content">
      <view v-if="current === 0">
        <uni-list-item
          :border="false"
          title="不锈钢盆"
          note="这里就不是什么"
          thumb="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
          thumb-size="lg"
          v-for="i in 10"
          :key="i"
        >
          <template v-slot:footer>
            <view class="flex justify-center items-center">
              <button size="mini">同意</button>
            </view>
          </template>
        </uni-list-item>
      </view>
      <view v-if="current === 1">
        <uni-list-item
          :border="false"
          title="不锈钢盆"
          note="这里就不是什么"
          thumb="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
          thumb-size="lg"
          v-for="i in 10"
          :key="i"
        />
      </view>
    </view>
  </CommonPageWrapper>
</template>

<script lang="ts" setup>
import CommonPageWrapper from '@/comps/common-page-wrapper/common-page-wrapper.vue'
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import logger from '@/utils/logger'

const current = ref(0)
const items = ref(['新朋友', '群通知'])

onLoad((data) => {
  if (!data || !data.tab) return
  current.value = parseInt(data.tab)
})

const onClickItem = (e: any) => {
  if (current.value !== e.currentIndex) {
    current.value = e.currentIndex
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  height: 100upx;
  display: flex;
  align-items: center;
  justify-content: center;
  .tabs-switch {
    width: 600upx;
  }
}
</style>

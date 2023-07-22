<template>
  <pageWithTabbar>
    <view class="news-card-list">
      <news-card v-for="i in 10" :key="i"></news-card>
    </view>
  </pageWithTabbar>
  <uni-fab ref="fab" class="add-button" @fabClick="handleAdd" horizontal="right" />
</template>

<script lang="ts">
import NewsCard from '@/comps/news-card/news-card.vue'
import pageWithTabbar from '@/comps/page-with-tabbar/page-with-tabbar.vue'
import { defineComponent } from 'vue'
import logger from '@/utils/logger'

export default defineComponent({
  components: {
    NewsCard,
    pageWithTabbar,
  },
  props: {
    id: {
      type: Number,
    },
    name: {
      type: String,
    },
  },
  data() {
    return {
      refreshFlag: false,
      swiperHeight: 0,
    }
  },
  onNavigationBarButtonTap(e) {
    uni.navigateTo({
      url: '/pages/publish/publish',
    })
  },
  mounted() {
    uni.getSystemInfo({
      success: (res) => {
        this.swiperHeight = res.windowHeight
      },
    })
  },
  methods: {
    handleRefresh() {
      this.refreshFlag = true
      logger.verbose('下拉刷新')
      setTimeout(() => {
        this.refreshFlag = false
      }, 1000)
    },
    handleLoadMore() {
      logger.verbose('加载更多')
    },
    handleAdd() {
      logger.verbose('添加新内容')
      uni.navigateTo({
        url: '/pages/publish/publish',
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.add-button {
  :deep(.uni-fab__circle) {
    box-shadow: none;
    background-color: #2ac4ff !important;
    bottom: calc(140upx);
  }
}
</style>

<template>
  <pageWithTabbar>
    <moment-card
      v-for="(item, i) in momentList"
      :author="item.author"
      :creatTime="item.creatTime"
      :content="item.content"
      :mediaList="item.mediaList"
      :key="i"
    ></moment-card>
  </pageWithTabbar>
  <uni-fab
    ref="fab"
    class="add-button"
    @fabClick="handleAdd"
    horizontal="right"
  />
</template>

<script>
import MomentCard from "@/comps/moment-card/moment-card.vue";
import pageWithTabbar from "@/comps/page-with-tabbar/page-with-tabbar.vue";
import { rGetMoment } from "@/io/http/moment";
import { defineComponent } from "vue";
import logger from "@/utils/logger";
import { useMomentStore } from "@/store";

export default defineComponent({
  components: {
    MomentCard,
    pageWithTabbar,
  },
  props: {
    id: {
      type: Number,
    },
    name: {
      type: Number,
    },
  },
  data() {
    return {
      refreshFlag: false,
      swiperHeight: 0,
    };
  },
  onNavigationBarButtonTap(e) {
    uni.navigateTo({
      url: "/pages/publish/publish",
    });
  },
  mounted() {
    rGetMoment(1);
    uni.getSystemInfo({
      success: (res) => {
        this.swiperHeight = res.windowHeight;
      },
    });
  },
  methods: {
    handleRefresh() {
      this.refreshFlag = true;
      logger.verbose("下拉刷新");
      setTimeout(() => {
        this.refreshFlag = false;
      }, 1000);
    },
    handleLoadMore() {
      logger.verbose("加载更多");
    },
    handleAdd() {
      logger.verbose("添加新内容");
      uni.navigateTo({
        url: "/pages/publish/publish",
      });
    },
  },
  setup() {
    const momentStore = useMomentStore();
    return {
      momentList: momentStore.momentList,
    };
  },
});
</script>

<style lang="scss" scoped>
.add-button {
  :deep(.uni-fab__circle) {
    box-shadow: none;
    background-color: #575170 !important;
    bottom: calc(140upx);
  }
}
</style>

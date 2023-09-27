<template>
  <pageWithTabbar>
    <uni-search-bar
      placeholder="超级搜索"
      @focus="handleGoSearch"
      cancelButton="none"
      class="bg-white"
    >
      <template #searchIcon>
        <uni-icons color="#999999" size="18" type="search" />
      </template>
    </uni-search-bar>
    <message-list></message-list>
  </pageWithTabbar>
</template>
<script>
import { defineComponent } from "vue";
import messageList from "@/comps/message-list/message-list.vue";
import pageWithTabbar from "@/comps/page-with-tabbar/page-with-tabbar.vue";
import logger from "@/utils/logger";

export default defineComponent({
  components: {
    pageWithTabbar,
    messageList,
  },
  methods: {
    handleGoSearch() {
      logger.verbose("前往搜索");
    },
  },
});
</script>

<style lang="scss" scoped>
.main-page {
  height: 100%;
  width: 100%;
}
</style>

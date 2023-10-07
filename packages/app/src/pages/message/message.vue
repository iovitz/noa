<template>
  <pageWithTabbar>
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

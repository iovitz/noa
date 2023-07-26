<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'

onLaunch(() => {})
onShow(() => {
  // logger.verbose('App Show')
})

onHide(() => {
  // logger.verbose('App Hide')
})
</script>

<!-- 这里的style不能设置scoped -->
<style lang="scss">
@import '@/common/uni-custom.scss';
@import '@/static/icon/iconfont.css';
@import '@/common/tailwind.css';

page {
  height: 100%;
  background-color: #f5f5f5;
  font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei,
    Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
}
</style>

<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { longChain } from '@/io/ws/ws'
import { getSession } from '@/utils/storage'
import { RouterGaide } from './utils/router'
import { socketEventManager } from './events/socket.events'
import logger from './utils/logger'
import { rGetMoment } from './io/http/moment'

uni.addInterceptor('navigateTo', {
  // 页面跳转前进行拦截, invoke根据返回值进行判断是否继续执行跳转
  invoke: ({ url }) => RouterGaide(url),
})

onLaunch((e) => {
  if (!e) return
  socketEventManager.bind()
  RouterGaide(e.path)
  if (getSession()) {
    longChain.connect()
  }
})

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
  color: #555555;
  font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei,
    Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
}
</style>
./utils/router

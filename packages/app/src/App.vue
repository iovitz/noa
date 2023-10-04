<script setup>
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { RouterGaide } from "./utils/router";
import { useAuthStore, useChatStore, useUserStore } from "./store";
import { getSession } from "./utils/storage";
import { longChain } from "./io/ws/ws";
import { rGetSTSKey } from "./io/http/oss";

const userStore = useUserStore();
const chatStore = useChatStore();
const authStore = useAuthStore();

uni.addInterceptor("navigateTo", {
  // 页面跳转前进行拦截, invoke根据返回值进行判断是否继续执行跳转
  invoke: ({ url }) => RouterGaide(url),
});

onLaunch(async (e) => {
  if (!e) return;
  RouterGaide(e.path);

  // 有session拉取数据
  if (getSession()) {
    // 拉取信息
    authStore.init();
  }
  const res = await rGetSTSKey();
  console.log(res);
});

onShow(() => {
  // logger.verbose('App Show')
});

onHide(() => {
  // logger.verbose('App Hide')
});
</script>

<!-- 这里的style不能设置scoped -->
<style lang="scss">
@import "@/common/uni-custom.scss";
@import "@/static/icon/iconfont.css";
@import "@/common/tailwind.css";

page {
  height: 100%;
  background-color: #f5f5f5;
  color: #7a7e83;
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    Helvetica Neue,
    PingFang SC,
    Microsoft YaHei,
    Source Han Sans SC,
    Noto Sans CJK SC,
    WenQuanYi Micro Hei,
    sans-serif;
}
</style>
./utils/router

import { useUserStore } from "@/store";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";

/**
 * 页面加载时获取用户的id和info，需要页面url的query中带有userid参数
 * @param useridRef 组件传入的useridRef
 * @param userInfoRef 组件传入的userinfoRef
 */
export function useLoadUserInfo() {
	// 当前主页的userid
	const userid = ref("");
	// 用户信息
	const userinfo = ref({
		nickname: "",
		avatar: "",
		userid: "",
	});
	onLoad(async (options) => {
		// 拿到需要获取的的userid
		const queryUserid = options?.userid;
		// @TODO 没有的话弹窗提示退出
		if (!queryUserid) {
			uni.navigateBack();
			return;
		}
		userid.value = queryUserid;
		fetchUserInfoToVueRef(userinfo, queryUserid);
	});
	return {
		userid,
		userinfo,
	};
}

export function useUserInfo(userid, force = false) {
	// 用户信息
	const userinfo = ref({
		nickname: "",
		avatar: "",
		userid: "",
	});
	fetchUserInfoToVueRef(userinfo, userid, force);
	return userinfo;
}

/**
 * 拉取userinfo信息到ref中
 * @param userinfo userinfo的ref对象
 * @param userid 用户id
 * @param force 不论用户信息是否存在都强制拉取
 */
function fetchUserInfoToVueRef(userinfo, userid, force = false) {
	const userStore = useUserStore();
	// 每次调用
	uni.showLoading({
		title: "正在加载用户信息",
		mask: true,
	});
	userStore.fetchUserInfo([userid], force).then(() => {
		uni.hideLoading();

		const storeUserInfo = userStore.userinfo[userid] || {};
		userinfo.value = {
			...userinfo.value,
			...storeUserInfo,
		};
	});
}

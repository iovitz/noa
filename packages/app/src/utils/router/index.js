import logger from "../logger";
import { getSession } from "../storage";

// 未登录路由白名单
const whiteList = ["/pages/entry/entry"];
const launchPageUrl = "/pages/launch/launch";

let launched = false;

export function RouterGaide(url) {
	// if (!launched) {
	// 	launched = true;
	// 	uni.navigateTo({
	// 		url: "/pages/launch/launch",
	// 	});
	// 	return;
	// }

	// // 启动页相关配置
	// if (url === launchPageUrl && launched) {
	// 	return;
	// }
	if (whiteList.includes(url)) {
		return true;
	}
	const session = getSession();
	if (!session) {
		logger.error("找不到Session，跳转登录页..");
		uni.reLaunch({
			url: "/pages/entry/entry",
		});
		return false;
	}
	return true;
}

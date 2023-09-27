import logger from "@/utils/logger";
import { storage } from "@/utils/storage";
import { Socket, io } from "@hyoga/uni-socket.io";

class LongChain {
	isConnected = false;

	eventQueue = [];

	connection;
	constructor(url, path) {
		this.connection = io(url, {
			path: path,
			query: {
				session: storage.get("session"),
			},
			transports: ["websocket", "polling"],
			timeout: 5000,
			// 取消自动连接
			autoConnect: false,
		});
		this.connection.on("connect", () => {
			if (!this.connection) return;

			const { id } = this.connection;

			logger.info("Socket链接成功", id);
			uni.$emit("SocketConnected", id);
			this.isConnected = true;
			this.emit("hello", {
				name: "zs",
			});
		});
		//监听断线
		this.connection.on("connect_error", (error) => {
			this.isConnected = false;
		});

		//监听断线
		this.connection.on("disconnect", (msg) => {
			logger.info("Socket断开连接", msg);
			uni.$emit("SocketDisconnect");
			this.isConnected = false;
		});
		//监听断线
		this.connection.onAny((eventName, payload) => {
			uni.$emit(`SOCKET@${eventName}`, payload);
		});
	}

	connect() {
		this.connection.connect();
	}

	on(event, callBack) {
		this.connection.on(event, callBack);
	}

	off(event, callBack) {
		this.connection?.off(event, callBack);
	}

	emit(event, data) {
		const { connection } = this;
		if (!this.isConnected || !connection) {
			this.eventQueue.push({
				event,
				data,
			});
			return;
		}
		this.eventQueue.forEach(({ event, data }) => {
			connection.emit(event, data);
		});
		connection.emit(event, data);
	}
}

export const longChain = new LongChain(
	import.meta.env.VITE_WS_URL,
	import.meta.env.VITE_WS_PATH,
);

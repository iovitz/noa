const LogLevel = {
	verbose: 0,
	log: 1,
	info: 2,
	warn: 3,
	error: 4,
};

class Logger {
	level = uni.getStorageSync("logger-to-console") ?? import.meta.env.DEV;

	constructor(level) {
		this.level = Number(level ? level : LogLevel.verbose);
	}

	verbose(message, ...args) {
		if (LogLevel.verbose >= this.level) console.log(message, ...args);
	}

	info(message, ...args) {
		if (LogLevel.info >= this.level) console.info(message, ...args);
	}

	warn(message, ...args) {
		if (LogLevel.warning >= this.level) console.warn(message, ...args);
	}

	error(message, ...args) {
		if (LogLevel.error >= this.level) console.error(message, ...args);
	}
}

const level =
	import.meta.env.VITE_LOG_LEVEL ?? uni.getStorageSync("app-enable-log");

const logger = new Logger(level);
export default logger;

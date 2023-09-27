export const registerRules = {
	nickname: {
		rules: [
			{
				required: true,
				errorMessage: "{label}不能为空",
			},
			// 对name字段进行长度验证
			{
				minLength: 2,
				maxLength: 10,
				errorMessage: "{label}长度在 {minLength} 到 {maxLength} 个字符",
			},
		],
		label: "昵称",
	},
	username: {
		rules: [
			{
				required: true,
				errorMessage: "{label}不能为空",
			},
			{
				pattern: /^[0-9a-zA-Z_]{6,16}$/,
				errorMessage: "6 到 16 个字母数字下划线字符组合",
			},
		],
		label: "用户名",
	},
	password: {
		rules: [
			{
				required: true,
				errorMessage: "{label}不能为空",
			},
			{
				minLength: 6,
				maxLength: 16,
				pattern: /^[0-9a-zA-Z_]{6,16}$/,
				errorMessage: "{label}长度在 {minLength} 到 {maxLength} 个字符",
			},
		],
		label: "密码",
	},
	repeat: {
		rules: [
			{
				required: true,
				errorMessage: "请再一次输入密码",
			},
			{
				validateFunction: function (rule, value, data, cb) {
					if (data.repeat !== data.password) {
						cb("两次密码不一致");
					}
					return true;
				},
			},
		],
	},
};
export const loginRules = {
	username: {
		rules: [
			{
				required: true,
				errorMessage: "{label}不能为空",
			},
			{
				pattern: /^[0-9a-zA-Z_]{6,16}$/,
				errorMessage: "6 到 16 个字母数字下划线字符组合",
			},
		],
		label: "用户名",
	},
	password: {
		rules: [
			{
				required: true,
				errorMessage: "{label}不能为空",
			},
			{
				minLength: 6,
				maxLength: 16,
				pattern: /^[0-9a-zA-Z_]{6,16}$/,
				errorMessage: "{label}长度在 {minLength} 到 {maxLength} 个字符",
			},
		],
		label: "密码",
	},
};

import { commonRequest } from "@/utils/request/request";

export const rLogin = (username, password) =>
	commonRequest.post(`/auth/login`, {
		username,
		password,
	});

export const rRegister = (nickname, username, password) =>
	commonRequest.post(`/auth/register`, {
		nickname,
		username,
		password,
	});

export const rLogout = (session) =>
	commonRequest.delete(`/auth/logout`, {
		session,
	});

import { commonRequest } from "@/utils/request/request";

export const rGetMoment = (page) => commonRequest.get(`/moments/p/${page}`);

export const rPublishMoment = (content, mediaStr, publish = true) =>
	commonRequest.post("/moments/publish", {
		content,
		mediaStr,
		publish,
	});

import { commonRequest } from "@/utils/request/request";

export const rGetMoment = (page) => commonRequest.get(`/moments/p/${page}`);

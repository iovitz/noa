import { commonRequest } from "@/utils/request/request";

export const rGetSTSKey = () => commonRequest.get(`/oss/ali_sts_key`);

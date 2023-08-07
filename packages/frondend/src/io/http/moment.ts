import { commonRequest } from '@/utils/request/request'

export const rGetMoment = (page: number) => commonRequest.get<any>(`/moments/p/${page}`)

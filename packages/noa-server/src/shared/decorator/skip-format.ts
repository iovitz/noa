import { SetMetadata } from '@nestjs/common'
import { SKIP_RESPONSE_FORMAT_KEY } from '../constans/meta-keys'

// 创建一个自定义装饰器来设置响应元数据
export function SkipFormat() {
  return SetMetadata(SKIP_RESPONSE_FORMAT_KEY, true)
}

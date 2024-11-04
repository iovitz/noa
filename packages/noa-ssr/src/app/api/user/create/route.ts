import { of } from 'await-of'
import { HttpStatusCode } from 'axios'
import { z, ZodError } from 'zod'

const CreateUser = z.object({
  phone: z.string().regex(/\d{11}/),
  password: z.string().regex(/[\w.!@#$%^&*]{6,16}/),
  code: z.string().regex(/\d{6}/),
})
export async function POST(
  request: Request,
) {
  const body = await request.json()

  // 校验
  const [data, err] = await of(CreateUser.parseAsync(body))
  if (err instanceof ZodError) {
    return Response.json({
      err: err.formErrors,
    }, {
      status: HttpStatusCode.UnprocessableEntity,
    })
  }

  return Response.json({
    data,
  })
}

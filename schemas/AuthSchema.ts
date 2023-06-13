import { z } from "zod"

export const LoginSchema = z.object({
  email: z.string().email("Email inválido"),
  code: z.string().length(6, "El código debe tener 6 caracteres"),
})

export const TokenPayloadSchema = z.object({
  sub: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  imageUrl: z.string(),
  roles: z.object({
    admin: z.boolean(),
    seller: z.boolean(),
  }),
})

export type Login = z.infer<typeof LoginSchema>
export type TokenPayload = z.infer<typeof TokenPayloadSchema> | null

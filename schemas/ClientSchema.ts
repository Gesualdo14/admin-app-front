import { z } from "zod"

export const DOC_TYPES = [
  "RUC",
  "Cédula",
  "Pasaporte",
  "Identificación Exterior",
] as const

export const ClientSchema = z
  .object({
    firstname: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    lastname: z.string().min(3, "El apellido debe tener al menos 3 caracteres"),
    email: z.string().email("Email inválido"),
    phoneCode: z.string().default("593"),
    phoneNumber: z.string(),
    document_type: z.enum(DOC_TYPES),
    document_value: z
      .string()
      .min(4, "El documento debe tener al menos 4 caracteres"),
  })
  .refine(
    ({ phoneCode, phoneNumber }) => {
      if (phoneCode === "593" && phoneNumber.length !== 10) return false
      return true
    },
    {
      message: "Mínimo 10 caracteres si el código es 593",
      path: ["phoneNumber"],
    }
  )

export type Client = z.infer<typeof ClientSchema>

export interface ClientFromDB extends Client {
  _id: string
  firstname: string
  sales?: { count: number; amount: number }
}

export interface ClientListProps {
  clients: ClientFromDB[]
}
export interface ClientFormProps {
  clientId?: string
}

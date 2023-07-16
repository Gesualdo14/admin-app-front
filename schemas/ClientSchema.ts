import { z } from "zod"

export const DOC_TYPES = [
  "RUC",
  "Cédula",
  "Pasaporte",
  "Identificación Exterior",
] as const

export const ClientSchema = z
  .object({
    firstname: z.string().min(3, "Al menos 3 caracteres"),
    lastname: z.string().min(3, "Al menos 3 caracteres"),
    email: z.string().email("Email inválido"),
    phoneCode: z.string().default("593"),
    phoneNumber: z.string(),
    document_type: z.enum(DOC_TYPES),
    document_value: z.string().min(4, "Al menos 4 caracteres"),
    file: z.any(),
  })
  .refine(
    ({ phoneCode, phoneNumber }) => {
      if (phoneCode === "593" && phoneNumber.length !== 10) return false
      return true
    },
    {
      message: "Exacto 10 caracteres si el código es 593",
      path: ["phoneNumber"],
    }
  )
  .refine(
    ({ document_type, document_value }) => {
      if (document_type === "RUC" && document_value.length !== 13) return false
      return true
    },
    {
      message: "RUC debe tener 13 caracteres",
      path: ["document_value"],
    }
  )
  .refine(
    ({ document_type, document_value }) => {
      if (document_type === "Cédula" && document_value.length !== 10)
        return false
      return true
    },
    {
      message: "Cédula debe tener 10 caracteres",
      path: ["document_value"],
    }
  )

export type Client = z.infer<typeof ClientSchema>

export interface ClientFromDB extends Client {
  _id: string
  firstname: string
  sales?: { count: number; amount: number }
  comissions?: number
}

export interface ClientListProps {
  clients: ClientFromDB[]
}
export interface ClientFormProps {
  clientId?: string
  refetch?: () => void
}

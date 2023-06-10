import { z } from "zod"

export const PAYMENT_METHOD_TYPES = [
  "Sin utilización Sist. Financiero",
  "Compensación de deudas",
  "Tarjeta de débito",
  "Tarjeta de crédito",
  "Dinero electrónico",
  "Otros con utilización del sistema financiero",
  "Endoso de títulos",
] as const

export const TIME_UNITS = z.enum(["Días", "Meses", "Años"])

export const saleProductSchema = z.object({
  code: z.string(),
  name: z.string().optional(),
  qty: z.number(),
  unit_price: z.number(),
  discount: z.number().optional(),
})

export const salePaymentMethodSchema = z.object({
  method: z.enum(PAYMENT_METHOD_TYPES),
  amount: z.number(),
  time_unit: TIME_UNITS,
  time_value: z.number(),
})

export const saleSchema = z.object({
  operation_date: z.date(),
  client_document: z.string(),
  products: z.array(saleProductSchema),
  payment_methods: z.array(salePaymentMethodSchema),
})

export type Sale = z.infer<typeof saleSchema>
export type PaymentMethod = z.infer<typeof salePaymentMethodSchema>
export type ProductForState = z.infer<typeof saleProductSchema>

export interface Product extends ProductForState {
  supplier_cost: number
  micro: number
  iva: number
  salvament_margin: number
  profit_margin: number
  unit_price: number
}

export interface ProductFormProps {
  saleId?: string
}

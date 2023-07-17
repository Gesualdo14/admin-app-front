import { z } from "zod"
import { ClientFromDB } from "./ClientSchema"

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
  iva: z.number(),
  unit_price: z.number(),
  discount: z.number().optional(),
})

export const salePaymentMethodSchema = z.object({
  method: z.enum(PAYMENT_METHOD_TYPES),
  amount: z.number().min(1, "El monto debe ser mayor a 0"),
  time_unit: TIME_UNITS.nullish(),
  time_value: z.number().nullish(),
})

export const saleSchema = z.object({
  subtotal: z.number(),
  totalIva: z.number(),
  discounts: z.number(),
  trigger_update: z.number(),
  referalDoc: z.string().nullish(),
  products: z.array(saleProductSchema),
  payment_methods: z.array(salePaymentMethodSchema),
})

export type Sale = z.infer<typeof saleSchema>
export type PaymentMethod = z.infer<typeof salePaymentMethodSchema>
export type ProductForState = z.infer<typeof saleProductSchema>

export interface SaleFromDB extends Sale {
  _id: string
  total_amount: number
  client: ClientFromDB
  referalDoc: string
}

export interface Product extends ProductForState {
  supplier_cost: number
  micro: number
  iva: number
  salvament_margin: number
  profit_margin: number
  unit_price: number
}

export interface SaleFormProps {
  saleId?: string
  clientId?: string
  clientSalesCount?: number
  comissions?: number
  refetch?: () => void
  onClose?: () => void
}

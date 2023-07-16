import { z } from "zod"

export const ProductSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  supplier_cost: z.number(),
  iva: z.number().max(1, "No puede ser mayor al 100%"),
  discount: z.number().max(1, "No puede ser mayor al 100%"),
  sold: z.boolean().optional(),
  micro: z.number(),
  salvament_margin: z.number().max(1, "No puede ser mayor al 100%"),
  profit_margin: z.number().max(1, "No puede ser mayor al 100%"),
})

export type ProductFromDB = z.infer<typeof ProductSchema>
export type Product = Omit<ProductFromDB, "_id" | "sold">

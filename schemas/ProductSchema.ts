import { z } from "zod"

export const ProductSchema = z.object({
  _id: z.string(),
  name: z.string(),
  code: z.string(),
  supplier_cost: z.number(),
  iva: z.number(),
  discount: z.number(),
  sold: z.boolean(),
  micro: z.number(),
  salvament_margin: z.number(),
  profit_margin: z.number(),
})

export type ProductFromDB = z.infer<typeof ProductSchema>

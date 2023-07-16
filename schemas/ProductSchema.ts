import { z } from "zod"

const invalidNumber = {
  invalid_type_error: "Debe ser un número",
}

export const ProductSchema = z.object({
  _id: z.string().optional(),
  name: z.string({ required_error: "El nombre es requerido" }),
  code: z.string({ required_error: "El código es requerido" }),
  supplier_cost: z.number(invalidNumber),
  iva: z.number(invalidNumber),
  discount: z.number(invalidNumber),
  sold: z.boolean().optional(),
  micro: z.number(),
  salvament_margin: z.number(invalidNumber),
  profit_margin: z.number(invalidNumber),
})

export type ProductFromDB = z.infer<typeof ProductSchema>
export type Product = Omit<ProductFromDB, "_id" | "sold">

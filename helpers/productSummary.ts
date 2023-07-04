import { ProductForState } from "schemas/SaleSchema"

interface ProductsSummary {
  subtotal: number
  totalIva: number
  discounts: number
}

const productSummary = (
  acc: ProductsSummary,
  curr: ProductForState
): ProductsSummary => {
  const { unit_price, iva, discount } = curr
  const { subtotal, discounts, totalIva } = acc
  const total = unit_price

  return {
    subtotal: subtotal + total,
    totalIva: totalIva + total * (iva || 0.12),
    discounts: discounts + total * (discount || 0),
  }
}

export const defaultProductSummary = {
  subtotal: 0,
  totalIva: 0,
  discounts: 0,
}

export default productSummary

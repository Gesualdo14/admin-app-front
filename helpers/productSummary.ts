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
  const { qty, unit_price, iva, discount } = curr
  const { subtotal, discounts, totalIva } = acc
  const total = qty * unit_price

  return {
    subtotal: subtotal + total,
    totalIva: totalIva + total * iva,
    discounts: discounts + total * (discount || 0),
  }
}

export const defaultProductSummary = {
  subtotal: 0,
  totalIva: 0,
  discounts: 0,
}

export default productSummary

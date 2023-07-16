import { ProductFromDB } from "schemas/ProductSchema"
import { ProductForState } from "schemas/SaleSchema"

const getProductDiscount = (product: ProductFromDB | ProductForState) => {
  const discount = (product.discount || 0) * 100
  const isDecimal = discount % 1 !== 0
  const formattedDiscount = discount.toFixed(isDecimal ? 2 : 0) + "% OFF"
  return { discount, formattedDiscount }
}

export default getProductDiscount

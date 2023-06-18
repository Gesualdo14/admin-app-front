import { ProductFromDB } from "schemas/ProductSchema"

const calcProductPrice = (product: ProductFromDB) => {
  const { supplier_cost, micro, iva, profit_margin, salvament_margin } = product

  const baseCost = micro + supplier_cost
  const minimumCost = baseCost / (1 - salvament_margin)
  const finalPrice = +(minimumCost / (1 - profit_margin)).toFixed(3)
  return finalPrice
}

export default calcProductPrice

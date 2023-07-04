import { ProductFromDB } from "schemas/ProductSchema"

const calcProductPrice = (product: ProductFromDB, withIva = false) => {
  const { supplier_cost, iva, micro, profit_margin, salvament_margin } = product

  const baseCost = micro + supplier_cost
  const minimumCost = baseCost / (1 - salvament_margin)
  const finalPrice = +(minimumCost / (1 - profit_margin)).toFixed(2)
  const finalPriceWithIva = +(finalPrice * (1 + iva)).toFixed(2)

  return withIva ? finalPriceWithIva : finalPrice
}

export default calcProductPrice

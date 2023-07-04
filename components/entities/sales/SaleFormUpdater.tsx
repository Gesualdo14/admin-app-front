import { useFormContext } from "react-hook-form"
import { useEffect } from "react"
import { Sale } from "schemas/SaleSchema"
import productSummary, { defaultProductSummary } from "helpers/productSummary"

const SaleFormUpdater = () => {
  const { setValue, watch, getValues } = useFormContext<Sale>()
  const trigger = watch("trigger_update")

  useEffect(() => {
    const products = getValues("products")
    const { subtotal, totalIva, discounts } = products.reduce(
      productSummary,
      defaultProductSummary
    )

    setValue("subtotal", subtotal)
    setValue("totalIva", totalIva)
    setValue("discounts", discounts)
  }, [trigger])

  return <></>
}

export default SaleFormUpdater

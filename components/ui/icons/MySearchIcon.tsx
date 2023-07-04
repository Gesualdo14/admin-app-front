import { SearchIcon } from "@chakra-ui/icons"
import { IconButton } from "@chakra-ui/react"
import axios from "axios"
import { useFormContext } from "react-hook-form"
import { Product } from "schemas/SaleSchema"
import { env } from "~/env.mjs"

interface Props {
  index: number
}

const MySearchIcon = ({ index }: Props) => {
  const { getValues, setValue } = useFormContext()

  return (
    <IconButton
      aria-label="Search"
      icon={<SearchIcon />}
      onClick={async () => {
        const code = getValues(`products.${index}.code`)

        if (!code) return
        const { data } = await axios.get(
          `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/${code}`,
          { withCredentials: true }
        )
        const product: Product = data.data
        const { supplier_cost, micro, profit_margin, salvament_margin } =
          product

        const baseCost = micro + supplier_cost
        const minimumCost = baseCost / (1 - salvament_margin)
        const finalPrice = +(minimumCost / (1 - profit_margin)).toFixed(3)

        if (!!product) {
          setValue(`products.${index}`, {
            code: code,
            name: product.name,
            unit_price: finalPrice,
          })
        } else {
          console.log("No existe un producto con ese código")
        }
      }}
    />
  )
}

export default MySearchIcon

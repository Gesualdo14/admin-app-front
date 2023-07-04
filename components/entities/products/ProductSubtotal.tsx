import React from "react"
import { useFormContext } from "react-hook-form"
import { Text } from "@chakra-ui/react"

const ProductSubtotal = ({ index, flex }: { index: number; flex: number }) => {
  const { watch } = useFormContext()
  const product = watch(`products.${index}`)
  return (
    <Text flex={flex} textAlign="end">
      ${product.unit_price.toFixed(2)}
    </Text>
  )
}

export default ProductSubtotal

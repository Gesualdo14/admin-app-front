import React from "react"
import { useFormContext } from "react-hook-form"
import { Divider, Flex, Text } from "@chakra-ui/react"
import { ProductForState } from "schemas/SaleSchema"

const ProductsSubtotal = () => {
  const { watch } = useFormContext()
  const products = (watch(`products`) as ProductForState[]) || []
  let subtotal = products.reduce(
    (acc, curr) => acc + curr.qty * curr.unit_price,
    0
  )
  if (!subtotal || products.length <= 1) return <></>
  return (
    <Flex flexDir="column">
      <Divider flex={1} />
      <Flex justifyContent="space-between">
        <Text fontWeight="bold">Subtotal</Text>
        <Text textAlign="end">${subtotal.toFixed(2)}</Text>
      </Flex>
    </Flex>
  )
}

export default ProductsSubtotal

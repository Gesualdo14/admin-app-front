import { Flex, Text } from "@chakra-ui/react"
import MyDeleteIcon from "components/ui/icons/MyDeleteIcon"
import MyInput from "components/ui/inputs/MyInput"
import { useFormContext } from "react-hook-form"
import { ProductForState, Sale } from "schemas/SaleSchema"
import ProductSubtotal from "./ProductSubtotal"

function ProductAdder() {
  const { watch } = useFormContext<Sale>()
  const products = watch("products")

  if (!products || products?.length === 0) {
    return (
      <Text mb={5} textAlign="center">
        No se ha agregado ningún producto
      </Text>
    )
  }

  return (
    <Flex flexDir="column" alignItems="flex-start">
      {products.map((product: ProductForState, index: number) => (
        <Flex
          key={index}
          gap={3}
          alignItems="center"
          justifyContent="space-between"
          mb={2}
          width="100%"
        >
          <Flex alignItems="center" gap={2} flex={6}>
            <MyDeleteIcon<Sale> fieldName="products" index={index} />
            <Text>{product.name}</Text>
          </Flex>
          <MyInput
            flex={2}
            fieldName={`products.${index}.qty`}
            label="Cantidad"
            mb={0}
            showLabel={false}
            size="sm"
            valueAsNumber
            triggerUpdate
          />
          <ProductSubtotal index={index} flex={3} />
        </Flex>
      ))}
    </Flex>
  )
}

export default ProductAdder

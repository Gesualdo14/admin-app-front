import { Flex, Text } from "@chakra-ui/react"
import MyDeleteIcon from "components/ui/icons/MyDeleteIcon"
import MyInput from "components/ui/inputs/MyInput"
import { useFormContext } from "react-hook-form"
import { Product, Sale } from "schemas/SaleSchema"

interface Props {
  fieldName: keyof Sale
}

function ProductAdder({ fieldName }: Props) {
  const { watch } = useFormContext()
  const products = watch(fieldName)

  if (!products || products.length === 0) {
    return <Text mb={5}>No se ha agregado ningún producto</Text>
  }

  return (
    <Flex flexDir="column" alignItems="flex-start">
      {products.map((product: Product, index: number) => (
        <Flex
          key={index}
          gap={3}
          alignItems="center"
          justifyContent="space-between"
          mb={2}
          width="100%"
        >
          <Text flex={6}>{product.name}</Text>
          <Flex alignItems="center" gap={2} flex={3}>
            <MyInput
              fieldName={`products.${index}.qty`}
              label="Cantidad"
              mb={0}
              showLabel={false}
              size="sm"
              valueAsNumber
            />
            <MyDeleteIcon<Sale> fieldName="products" index={index} />
          </Flex>
        </Flex>
      ))}
    </Flex>
  )
}

export default ProductAdder

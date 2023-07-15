import { Flex, Text } from "@chakra-ui/react"
import MyDeleteIcon from "components/ui/icons/MyDeleteIcon"
import { useFormContext } from "react-hook-form"
import { ProductForState, Sale } from "schemas/SaleSchema"
import ProductSubtotal from "./ProductSubtotal"
import getProductDiscount from "helpers/getProductDiscount"
// import { useCopyToClipboard } from "hooks/useCopyToClipboard"

function ProductAdder({ canRemove = true }) {
  const { watch } = useFormContext<Sale>()
  const products = watch("products")
  // const copyToClipboard = useCopyToClipboard({ text: "", title: "" })

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
          {canRemove && (
            <MyDeleteIcon<Sale> fieldName="products" index={index} />
          )}
          <Flex flexDir="column" flex={6}>
            <Flex gap={2} mb={-0.5}>
              <Text>{product.name}</Text>
            </Flex>
            <Flex>
              <Text
                fontSize="xs"
                color="blue.400"
                mr="0.5rem"
                _hover={{ color: "green.400", cursor: "pointer" }}
                // onClick={(e) =>
                //   copyToClipboard({
                //     event: e,
                //     text: product.code,
                //     toast,
                //     title: "Código copiado",
                //   })
                // }
              >
                {product.code}
              </Text>
              {getProductDiscount(product).discount > 0 && (
                <Text fontSize="xs" color="red.400">
                  {getProductDiscount(product).formattedDiscount}
                </Text>
              )}
            </Flex>
          </Flex>

          <ProductSubtotal index={index} flex={3} />
        </Flex>
      ))}
    </Flex>
  )
}

export default ProductAdder

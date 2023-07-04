import { Badge, Card, Flex, Text, useToast } from "@chakra-ui/react"
import calcProductPrice from "helpers/calcProductPrice"
import { ProductFromDB } from "schemas/ProductSchema"
import getProductDiscount from "../../../helpers/getProductDiscount"

interface Props {
  product: ProductFromDB
  onClick: (product: ProductFromDB) => void
  selected?: boolean
}

const ProductItem = ({ product, onClick, selected }: Props) => {
  const productPrice = calcProductPrice(product, true)
  const toast = useToast()
  const { discount, formattedDiscount } = getProductDiscount(product)
  return (
    <Card
      key={product._id}
      py={2}
      px={4}
      cursor="pointer"
      bg={selected ? "gray.100" : "white"}
      color="black"
      _hover={{
        backgroundColor: "gray.100",
        color: "#222",
        transition: "0.2s background-color ease-out, 0.2s color ease-out",
      }}
      onClick={() => onClick(product)}
      flexDir="row"
      justifyContent="space-between"
    >
      <Flex flexDir="column">
        <Flex alignItems="center">
          <Text>{product.name}</Text>
          {product.sold && (
            <Badge ml="3" colorScheme="green" fontSize="xs">
              SOLD
            </Badge>
          )}
        </Flex>
        <Text
          fontSize="xs"
          display="inline"
          color="blue.400"
          _hover={{ color: "green.400" }}
          onClick={(e) => {
            e.stopPropagation()
            navigator.clipboard.writeText(product.code)
            toast({
              position: "top",
              title: "Código copiado",
              status: "success",
              duration: 1500,
            })
          }}
        >
          {product.code}
        </Text>
      </Flex>
      <Flex flexDir="column">
        <Text>$ {productPrice || 0}</Text>
        {discount > 0 && (
          <Text alignSelf="flex-end" color="red.400" fontSize="sm">
            {formattedDiscount}
          </Text>
        )}
      </Flex>
    </Card>
  )
}

export default ProductItem

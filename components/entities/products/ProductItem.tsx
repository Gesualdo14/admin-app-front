import { Badge, Flex, Text, useToast } from "@chakra-ui/react"
import calcProductPrice from "helpers/calcProductPrice"
import { ProductFromDB } from "schemas/ProductSchema"
import getProductDiscount from "../../../helpers/getProductDiscount"
import ListItemWrapper from "components/ui/lists/ListItemWrapper"
import { copyToClipboard } from "helpers/copyToClipboard"

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
    <ListItemWrapper onClick={() => onClick(product)} selected={selected}>
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
          onClick={(e) =>
            copyToClipboard({
              e,
              text: product.code,
              toast,
            })
          }
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
    </ListItemWrapper>
  )
}

export default ProductItem

import { Card, Text } from "@chakra-ui/react"
import { ProductFromDB } from "schemas/ProductSchema"

interface Props {
  product: ProductFromDB
  onClick: (product: ProductFromDB) => void
  selected?: boolean
}

const ProductItem = ({ product, onClick, selected }: Props) => {
  return (
    <Card
      key={product._id}
      py={2}
      px={4}
      cursor="pointer"
      bg={selected ? "gray.200" : "white"}
      color="black"
      _hover={{
        backgroundColor: "gray.200",
        color: "#222",
        transition: "0.2s background-color ease-out, 0.2s color ease-out",
      }}
      onClick={() => onClick(product)}
      flexDir="row"
      justifyContent="space-between"
    >
      <Text>{product.name}</Text>
      <Text>$ {product.supplier_cost || 0}</Text>
    </Card>
  )
}

export default ProductItem

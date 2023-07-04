import { Flex, Spinner, Text } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { ProductFromDB } from "schemas/ProductSchema"
import { env } from "~/env.mjs"
import ProductItem from "./ProductItem"
import { ProductForState } from "schemas/SaleSchema"

interface Props {
  searchText?: string | undefined
  onClick: (product: ProductFromDB) => void
  selectedProducts?: ProductFromDB[]
  addedProducts?: ProductForState[]
  onlyToSell?: boolean
}
const ProductsList = ({
  searchText,
  onClick,
  selectedProducts,
  addedProducts,
  onlyToSell = false,
}: Props) => {
  const PARAMS = !!searchText ? `&searchText=${searchText}` : ""

  const { data: products, isLoading } = useQuery<ProductFromDB[]>({
    queryKey: searchText ? ["products", searchText] : ["products"],
    queryFn: async () => {
      const res = await axios.get(
        `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/products?toSell=${onlyToSell}${PARAMS}`,
        {
          withCredentials: true,
        }
      )
      return res.data.data
    },
  })
  let filteredProducts = products
  if (Array.isArray(addedProducts)) {
    filteredProducts = products?.filter((p) => {
      return !addedProducts.find((ap) => ap.code === p.code)
    })
  }
  return (
    <Flex
      flexDirection="column"
      p={1}
      gap={2}
      my={4}
      maxHeight="40vh"
      overflowY="scroll"
    >
      {isLoading && <Spinner height={5} alignSelf="center" mt={10} mb={10} />}
      {(!filteredProducts || filteredProducts.length === 0) && !isLoading && (
        <Text mb={5}>No hay productos para mostrar</Text>
      )}
      {filteredProducts?.map((p) => (
        <ProductItem
          key={p._id}
          product={p}
          onClick={onClick}
          selected={selectedProducts?.includes(p)}
        />
      ))}
    </Flex>
  )
}

export default ProductsList

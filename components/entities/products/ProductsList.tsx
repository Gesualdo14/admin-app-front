import { Flex, Spinner, Text } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { ProductFromDB } from "schemas/ProductSchema"
import { env } from "~/env.mjs"
import ProductItem from "./ProductItem"

interface Props {
  searchText?: string | undefined
  onClick: (product: ProductFromDB) => void
  selectedProducts?: ProductFromDB[]
}
const ProductsList = ({ searchText, onClick, selectedProducts }: Props) => {
  const PARAMS = !!searchText ? `?searchText=${searchText}` : ""

  const { data: products, isLoading } = useQuery<ProductFromDB[]>({
    queryKey: ["products", searchText],
    queryFn: async () => {
      const res = await axios.get(
        `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/products${PARAMS}`,
        {
          withCredentials: true,
        }
      )
      return res.data.data
    },
  })
  if (isLoading) return <Spinner />
  if (!products) return <Text mb={5}>No hay ventas para mostrar</Text>

  return (
    <Flex
      flexDirection="column"
      p={1}
      gap={2}
      my={4}
      maxHeight="40vh"
      overflowY="scroll"
    >
      {products.map((p) => (
        <ProductItem
          product={p}
          onClick={onClick}
          selected={selectedProducts?.includes(p)}
        />
      ))}
    </Flex>
  )
}

export default ProductsList

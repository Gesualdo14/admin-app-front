import { Card, Flex, Spinner, Text } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/router"
import { SaleFromDB } from "schemas/SaleSchema"
import { env } from "~/env.mjs"
import SaleItem from "./SaleItem"

interface Props {
  onClick: (client: SaleFromDB) => void
  selectedSaleId: string | undefined
}
const SalesList = ({ onClick, selectedSaleId }: Props) => {
  const { data: sales, isLoading } = useQuery<SaleFromDB[]>({
    queryKey: ["sales"],
    queryFn: async () => {
      const res = await axios.get(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/sales`, {
        withCredentials: true,
      })
      return res.data.data
    },
  })

  const router = useRouter()

  if (isLoading) return <Spinner />

  if (!sales) return <Text mb={5}>No hay ventas para mostrar</Text>

  return (
    <Flex
      flexDirection="column"
      p={1}
      gap={2}
      my={4}
      maxHeight="40vh"
      overflowY="scroll"
    >
      {sales
        .sort((a, b) => (b?.total_amount || 0) - (a?.total_amount || 0))
        .map((s) => (
          <SaleItem
            sale={s}
            key={s._id}
            onClick={onClick}
            selected={s._id === selectedSaleId}
          />
        ))}
    </Flex>
  )
}

export default SalesList

import { Flex, Spinner, Text } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { SaleFromDB } from "schemas/SaleSchema"
import { env } from "~/env.mjs"
import SaleItem from "./SaleItem"

interface Props {
  selectedMonth: number | null
  selectedYear: number | null
  onClick: (client: SaleFromDB) => void
  selectedSaleId: string | undefined
}
const SalesList = ({
  onClick,
  selectedMonth,
  selectedYear,
  selectedSaleId,
}: Props) => {
  const PARAMS = selectedMonth
    ? `?month=${selectedMonth}&year=${selectedYear}`
    : ""
  const { data: sales, isLoading } = useQuery<SaleFromDB[]>({
    queryKey: ["sales", selectedMonth],
    queryFn: async () => {
      const res = await axios.get(
        `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/sales${PARAMS}`,
        {
          withCredentials: true,
        }
      )
      return res.data.data
    },
    refetchOnWindowFocus: true,
  })

  return (
    <Flex flexDir="column">
      {isLoading && <Spinner alignSelf="center" mt={10} mb={10} />}
      {!sales && !isLoading && <Text mb={5}>No hay ventas para mostrar</Text>}
      {sales && (
        <Flex
          flexDirection="column"
          p={1}
          gap={2}
          my={4}
          maxHeight="30vh"
          overflowY="scroll"
        >
          {sales.map((s) => (
            <SaleItem
              sale={s}
              key={s._id}
              onClick={onClick}
              selected={s._id === selectedSaleId}
            />
          ))}
        </Flex>
      )}
    </Flex>
  )
}

export default SalesList

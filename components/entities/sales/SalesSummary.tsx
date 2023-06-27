import { Flex, Spinner, Text } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Dispatch, SetStateAction } from "react"
import { env } from "~/env.mjs"
import SaleSummaryItem from "./SaleSummaryItem"

interface Props {
  selectedMonth: number | null
  selectedYear: number | null
  setSelectedMonth: Dispatch<SetStateAction<number | null>>
  setSelectedYear: Dispatch<SetStateAction<number | null>>
}

const SalesSummary = ({
  selectedMonth,
  selectedYear,
  setSelectedMonth,
  setSelectedYear,
}: Props) => {
  const { data: periods, isLoading } = useQuery({
    queryKey: ["sales", "summary"],
    queryFn: async () => {
      const res = await axios.get(
        `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/sales/summary`,
        {
          withCredentials: true,
        }
      )
      return res.data.data
    },
  })

  if (isLoading) return <Spinner />

  if (!periods) return <Text mb={5}>No hay ventas para mostrar</Text>

  console.log({ periods })

  return (
    <Flex p={1} gap={2} my={4} maxHeight="40vh" overflowY="scroll">
      {periods.map((p: any) => (
        <SaleSummaryItem
          period={p}
          selected={
            selectedMonth === p._id.month && selectedYear === p._id.year
          }
          setSelectedMonth={setSelectedMonth}
          setSelectedYear={setSelectedYear}
        />
      ))}
    </Flex>
  )
}

export default SalesSummary

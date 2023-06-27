import { Card, Flex, Text } from "@chakra-ui/react"
import getMonthName from "helpers/getMonthName"
import { Dispatch, SetStateAction } from "react"

interface Props {
  period: any
  setSelectedMonth: Dispatch<SetStateAction<number | null>>
  setSelectedYear: Dispatch<SetStateAction<number | null>>
  selected: boolean
}

const SaleSummaryItem = ({
  period,
  selected,
  setSelectedMonth,
  setSelectedYear,
}: Props) => {
  return (
    <Card
      key={period._id}
      width="auto"
      colorScheme="blue"
      py={1}
      px={2}
      onClick={() => {
        const monthToSet = selected ? null : period._id.month
        const yearToSet = selected ? null : period._id.year
        setSelectedMonth(monthToSet)
        setSelectedYear(yearToSet)
      }}
      bg={selected ? "gray.100" : "white"}
      _hover={{
        cursor: "pointer",
        backgroundColor: "gray.100",
      }}
    >
      <Flex flexDir="column" alignItems="center">
        <Text>{getMonthName(period._id.month - 1)}</Text>
        <Text color="green.400">${period.sales.toFixed(2)}</Text>
      </Flex>
    </Card>
  )
}

export default SaleSummaryItem

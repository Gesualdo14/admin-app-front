import { Card, Flex, Text } from "@chakra-ui/react"
import { SaleFromDB } from "schemas/SaleSchema"

interface Props {
  sale: SaleFromDB
  onClick: (sale: SaleFromDB) => void
  selected?: boolean
}

const SaleItem = ({ sale, onClick, selected }: Props) => {
  return (
    <Card
      key={sale._id}
      py={2}
      px={4}
      cursor="pointer"
      bg={selected ? "gray.100" : "white"}
      color="black"
      _hover={
        selected
          ? {}
          : {
              backgroundColor: "gray.100",
              color: "#222",
            }
      }
      onClick={() => onClick(sale)}
      flexDir="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Text>
        {sale.client.firstname} {sale.client.lastname}
      </Text>
      <Flex flexDir="column" alignItems="flex-end">
        <Text>$ {sale.total_amount?.toFixed(2) || 0}</Text>
      </Flex>
    </Card>
  )
}

export default SaleItem

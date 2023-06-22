import { Card, Text } from "@chakra-ui/react"
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
      bg={selected ? "gray.200" : "white"}
      color="black"
      _hover={
        selected
          ? {}
          : {
              backgroundColor: "gray.200",
              color: "#222",
            }
      }
      onClick={() => onClick(sale)}
      flexDir="row"
      justifyContent="space-between"
    >
      <Text>{sale.client.firstname}</Text>
      <Text>$ {sale.total_amount?.toFixed(2) || 0}</Text>
    </Card>
  )
}

export default SaleItem

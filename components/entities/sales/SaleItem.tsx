import { Flex, Text } from "@chakra-ui/react"
import ListItemWrapper from "components/ui/lists/ListItemWrapper"
import { SaleFromDB } from "schemas/SaleSchema"

interface Props {
  sale: SaleFromDB
  onClick: (sale: SaleFromDB) => void
  selected?: boolean
}

const SaleItem = ({ sale, onClick, selected }: Props) => {
  return (
    <ListItemWrapper onClick={() => onClick(sale)} selected={selected}>
      <Text>
        {sale.client.firstname} {sale.client.lastname}
      </Text>
      <Flex flexDir="column" alignItems="flex-end">
        <Text>$ {sale.total_amount?.toFixed(2) || 0}</Text>
      </Flex>
    </ListItemWrapper>
  )
}

export default SaleItem

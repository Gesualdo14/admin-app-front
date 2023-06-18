import { Card, Text } from "@chakra-ui/react"
import { ClientFromDB } from "schemas/ClientSchema"

interface Props {
  client: ClientFromDB
  onClick: (client: ClientFromDB) => void
  selected?: boolean
}

const ClientItem = ({ client, onClick, selected }: Props) => {
  return (
    <Card
      key={client._id}
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
      onClick={() => onClick(client)}
      flexDir="row"
      justifyContent="space-between"
    >
      <Text>{client.firstname}</Text>
      <Text color="green">$ {client.sales?.amount?.toFixed(2) || 0}</Text>
    </Card>
  )
}

export default ClientItem

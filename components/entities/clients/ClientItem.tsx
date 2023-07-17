import { Card, Flex, Text, useToast } from "@chakra-ui/react"
import { copyToClipboard } from "helpers/copyToClipboard"
import { ClientFromDB } from "schemas/ClientSchema"

interface Props {
  client: ClientFromDB
  onClick: (client: ClientFromDB) => void
  selected?: boolean
}

const ClientItem = ({ client, onClick, selected }: Props) => {
  const noSales = client.sales?.count === 0 || !client.sales?.count
  const s = client.sales?.count === 1 ? "" : "s"
  const toast = useToast()
  console.log({ client })
  return (
    <Card
      key={client._id}
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
      onClick={() => onClick(client)}
      flexDir="row"
      justifyContent="space-between"
    >
      <Flex flexDir="column">
        <Text>
          {client.firstname} {client.lastname}
        </Text>
        <Text
          fontSize="xs"
          display="inline"
          color="blue.400"
          _hover={{ color: "green.400" }}
          onClick={(e) =>
            copyToClipboard({
              e,
              text: client.document_value,
              toast,
            })
          }
        >
          {client.document_value}{" "}
          <Text as="span" fontSize="xs" display="inline" color="gray">
            ({client.document_type})
          </Text>
        </Text>
      </Flex>
      <Flex flexDir="column" alignItems="flex-end">
        {noSales ? (
          <Text color="red.600">Sin ventas</Text>
        ) : (
          <Text color="green" title={`${client.sales?.count} venta${s}`}>
            $ {client.sales?.amount?.toFixed(2)}
          </Text>
        )}
        {(client?.comissions || 0) > 0 && (
          <Text as="span" fontSize="xs" color="purple.400">
            ${client?.comissions} en comisiones
          </Text>
        )}
      </Flex>
    </Card>
  )
}

export default ClientItem

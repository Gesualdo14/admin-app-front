import { Card, Flex, Text } from "@chakra-ui/react"
import { Client } from "./ClientForm"
import { useRouter } from "next/router"

interface ClientFromDB extends Client {
  _id: string
}

interface Props {
  clients: ClientFromDB[]
}

const ClientsList = ({ clients }: Props) => {
  const router = useRouter()
  return (
    <>
      <Flex flexDirection="column" gap={2} mt={2}>
        {clients.map((c) => (
          <Card
            key={c._id}
            py={2}
            px={4}
            cursor="pointer"
            _hover={{
              backgroundColor: "gray.200",
              color: "#222",
              transition: "0.2s background-color ease-out, 0.2s color ease-out",
            }}
            onClick={() => router.push(`/clients/${c._id}`)}
          >
            <Text>{c.firstname}</Text>
          </Card>
        ))}
      </Flex>
      <style jsx>
        {`
          .chakra-card:hover {
            background-color: red !important;
          }
        `}
      </style>
    </>
  )
}

export default ClientsList

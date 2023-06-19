import { Card, Flex, Spinner, Text } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/router"
import { ClientFromDB } from "schemas/ClientSchema"
import { env } from "~/env.mjs"
import ClientItem from "./ClientItem"

interface Props {
  onClick: (client: ClientFromDB) => void
  selectedClientId: string | undefined
}

const ClientsList = ({ onClick, selectedClientId }: Props) => {
  const { data: clients, isLoading } = useQuery<ClientFromDB[]>({
    queryKey: ["clients"],
    queryFn: async () => {
      const res = await axios.get(
        `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/clients`,
        { withCredentials: true }
      )
      return res?.data?.data
    },
  })

  const router = useRouter()
  if (isLoading) return <Spinner />
  if (!clients) return <Text mb={5}>No hay clientes para mostrar</Text>

  return (
    <Flex
      flexDirection="column"
      p={1}
      gap={2}
      my={4}
      maxHeight="40vh"
      overflowY="scroll"
    >
      {clients
        .sort((a, b) => (b.sales?.amount || 0) - (a.sales?.amount || 0))
        .map((c) => (
          <ClientItem
            key={c._id}
            client={c}
            onClick={onClick}
            selected={c._id === selectedClientId}
          />
        ))}
    </Flex>
  )
}

export default ClientsList

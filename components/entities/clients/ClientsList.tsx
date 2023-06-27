import { Flex, Spinner, Text } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { ClientFromDB } from "schemas/ClientSchema"
import { env } from "~/env.mjs"
import ClientItem from "./ClientItem"
import { ReactNode, useState } from "react"
import SearchForm from "components/ui/forms/SearchForm"

interface Props {
  onClick: (client: ClientFromDB) => void
  selectedClientId: string | undefined
  children: (props: { refetch: () => void }) => ReactNode
}

const ClientsList = ({ onClick, selectedClientId, children }: Props) => {
  const [searchText, setSearchText] = useState("")
  const PARAMS = searchText ? `?searchText=${searchText}` : ""
  const {
    data: clients,
    isLoading,
    refetch,
  } = useQuery<ClientFromDB[]>({
    queryKey: ["clients", searchText],
    queryFn: async () => {
      const res = await axios.get(
        `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/clients${PARAMS}`,
        { withCredentials: true }
      )
      return res?.data?.data
    },
  })

  const noClients = !clients || clients.length === 0

  return (
    <Flex flexDir="column">
      <SearchForm
        setSearchText={setSearchText}
        placeholder="Buscar cliente..."
      />
      {isLoading && <Spinner alignSelf="center" mt={20} mb={20} />}
      {noClients && !isLoading && (
        <Text mt={5} textAlign="center">
          No hay registros{" "}
          {!searchText ? "en la base de datos" : "para ese término de búsqueda"}
        </Text>
      )}
      {clients && (
        <>
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
          {children({ refetch })}
        </>
      )}
    </Flex>
  )
}

export default ClientsList

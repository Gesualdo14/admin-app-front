import { Flex, TabPanel } from "@chakra-ui/react"
import MyModal from "components/ui/modals/MyModal"
import ClientForm from "./ClientForm"
import SaleForm from "../sales/SaleForm"
import { useState } from "react"
import { ClientFromDB } from "schemas/ClientSchema"
import SearchForm from "components/ui/forms/SearchForm"
import ClientItem from "./ClientItem"
import List from "components/ui/lists/List"

const ClientsPanel = () => {
  const [searchText, setSearchText] = useState("")
  const [selectedClient, setSelectedClient] = useState<ClientFromDB | null>()
  return (
    <TabPanel p={0}>
      <SearchForm
        setSearchText={setSearchText}
        placeholder="Buscar cliente..."
      />
      <List<ClientFromDB>
        path="clients"
        sortFunction={(a, b) => (a.sales?.amount || 0) - (b.sales?.amount || 0)}
        urlParams={{ searchText }}
      >
        {({ items, refetch }) => (
          <>
            <Flex
              flexDirection="column"
              p={1}
              gap={2}
              my={4}
              maxHeight="40vh"
              overflowY="scroll"
            >
              {items.map((c) => (
                <ClientItem
                  key={c._id}
                  client={c}
                  onClick={(c) => {
                    const valueToSet = c._id === selectedClient?._id ? null : c
                    setSelectedClient(valueToSet)
                  }}
                  selected={c._id === selectedClient?._id}
                />
              ))}
            </Flex>
            <Flex>
              <MyModal
                title={(selectedClient ? "Editar " : "Nuevo ") + "cliente"}
                mr={2}
              >
                {() => (
                  <ClientForm
                    clientId={selectedClient?._id}
                    refetch={refetch}
                  />
                )}
              </MyModal>
              <MyModal
                title="Nueva venta"
                colorScheme="green"
                disableButton={!selectedClient}
              >
                {({ onClose }) => (
                  <SaleForm
                    clientId={selectedClient?._id}
                    comissions={selectedClient?.comissions || 0}
                    clientSalesCount={selectedClient?.sales?.count || 0}
                    refetch={refetch}
                    onClose={onClose}
                  />
                )}
              </MyModal>
            </Flex>
          </>
        )}
      </List>
    </TabPanel>
  )
}

export default ClientsPanel

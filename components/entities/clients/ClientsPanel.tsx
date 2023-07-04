import { Flex, TabPanel } from "@chakra-ui/react"
import ClientsList from "./ClientsList"
import MyModal from "components/ui/modals/MyModal"
import ClientForm from "./ClientForm"
import SaleForm from "../sales/SaleForm"
import { useState } from "react"
import { ClientFromDB } from "schemas/ClientSchema"

const ClientsPanel = () => {
  const [selectedClient, setSelectedClient] = useState<ClientFromDB | null>()
  return (
    <TabPanel p={0}>
      <ClientsList
        selectedClientId={selectedClient?._id}
        onClick={(c) => {
          const valueToSet = c._id === selectedClient?._id ? null : c
          setSelectedClient(valueToSet)
        }}
      >
        {({ refetch }) => (
          <Flex>
            <MyModal
              title={(selectedClient ? "Editar " : "Nuevo ") + "cliente"}
              mr={2}
            >
              {() => (
                <ClientForm clientId={selectedClient?._id} refetch={refetch} />
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
        )}
      </ClientsList>
    </TabPanel>
  )
}

export default ClientsPanel

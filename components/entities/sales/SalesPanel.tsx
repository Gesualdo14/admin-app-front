import { TabPanel } from "@chakra-ui/react"
import SalesList from "./SalesList"
import MyModal from "components/ui/modals/MyModal"
import { useState } from "react"
import { SaleFromDB } from "schemas/SaleSchema"
import SaleForm from "./SaleForm"

const SalesPanel = () => {
  const [selectedSale, setSelectedSale] = useState<SaleFromDB | null>()
  return (
    <TabPanel p={0}>
      <SalesList
        onClick={(s) => {
          const valueToSet = s._id === selectedSale?._id ? null : s
          setSelectedSale(valueToSet)
        }}
        selectedSaleId={selectedSale?._id}
      />
      <MyModal
        title="Editar venta"
        colorScheme="green"
        disableButton={!selectedSale}
      >
        <SaleForm saleId={selectedSale?._id} />
      </MyModal>
    </TabPanel>
  )
}

export default SalesPanel

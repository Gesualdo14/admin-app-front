import { TabPanel } from "@chakra-ui/react"
import SalesList from "./SalesList"
import MyModal from "components/ui/modals/MyModal"
import { useState } from "react"
import { SaleFromDB } from "schemas/SaleSchema"
import SaleForm from "./SaleForm"
import SalesSummary from "./SalesSummary"

const SalesPanel = () => {
  const [selectedSale, setSelectedSale] = useState<SaleFromDB | null>()
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null)
  const [selectedYear, setSelectedYear] = useState<number | null>(null)

  return (
    <TabPanel p={0}>
      <SalesSummary
        setSelectedMonth={setSelectedMonth}
        selectedMonth={selectedMonth}
        setSelectedYear={setSelectedYear}
        selectedYear={selectedYear}
      />
      <SalesList
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onClick={(s) => {
          const valueToSet = s._id === selectedSale?._id ? null : s
          setSelectedSale(valueToSet)
        }}
        selectedSaleId={selectedSale?._id}
      />
      <MyModal
        title=""
        buttonText="Ver venta"
        colorScheme="blue"
        disableButton={!selectedSale}
      >
        {({ onClose }) => (
          <SaleForm saleId={selectedSale?._id} onClose={onClose} />
        )}
      </MyModal>
    </TabPanel>
  )
}

export default SalesPanel

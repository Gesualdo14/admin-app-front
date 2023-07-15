import { Flex, TabPanel } from "@chakra-ui/react"
import MyModal from "components/ui/modals/MyModal"
import { useState } from "react"
import { SaleFromDB } from "schemas/SaleSchema"
import SaleForm from "./SaleForm"
import SalesSummary from "./SalesSummary"
import List from "components/ui/lists/List"
import SaleItem from "./SaleItem"

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

      <List<SaleFromDB>
        path="sales"
        urlParams={{ month: selectedMonth, year: selectedYear }}
      >
        {({ items }) => (
          <>
            <Flex
              flexDirection="column"
              p={1}
              gap={2}
              my={4}
              maxHeight="40vh"
              overflowY="scroll"
            >
              {items.map((s) => (
                <SaleItem
                  key={s._id}
                  sale={s}
                  onClick={(s) => {
                    const valueToSet = s._id === selectedSale?._id ? null : s
                    setSelectedSale(valueToSet)
                  }}
                  selected={selectedSale?._id === s._id}
                />
              ))}
            </Flex>
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
          </>
        )}
      </List>
    </TabPanel>
  )
}

export default SalesPanel

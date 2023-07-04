import { TabPanel } from "@chakra-ui/react"
import ProductsList from "./ProductsList"
import { useState } from "react"
import SearchForm from "components/ui/forms/SearchForm"

const ProductsPanel = () => {
  const [searchText, setSearchText] = useState("")
  return (
    <TabPanel p={0}>
      <SearchForm
        placeholder="Buscar producto..."
        setSearchText={setSearchText}
      />
      <ProductsList
        onClick={() => console.log("CLICK")}
        searchText={searchText}
      />
    </TabPanel>
  )
}

export default ProductsPanel

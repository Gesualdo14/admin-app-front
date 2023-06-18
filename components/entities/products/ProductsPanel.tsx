import { TabPanel } from "@chakra-ui/react"
import ProductsList from "./ProductsList"

const ProductsPanel = () => {
  return (
    <TabPanel p={0}>
      <ProductsList onClick={() => console.log("CLICK")} />
    </TabPanel>
  )
}

export default ProductsPanel

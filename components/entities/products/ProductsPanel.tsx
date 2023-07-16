import { Flex, TabPanel } from "@chakra-ui/react"
import { useState } from "react"
import SearchForm from "components/ui/forms/SearchForm"
import List from "components/ui/lists/List"
import ProductItem from "./ProductItem"
import { ProductFromDB } from "schemas/ProductSchema"
import ProductForm from "./ProductForm"
import MyModal from "components/ui/modals/MyModal"

const ProductsPanel = () => {
  const [searchText, setSearchText] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<ProductFromDB | null>()

  return (
    <TabPanel p={0}>
      <SearchForm
        placeholder="Buscar producto..."
        setSearchText={setSearchText}
      />
      <List<ProductFromDB>
        path="products"
        urlParams={{ searchText, toSell: false }}
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
              {items.map((p) => (
                <ProductItem
                  key={p._id}
                  product={p}
                  onClick={(p) => {
                    const valueToSet = p._id === selectedProduct?._id ? null : p
                    setSelectedProduct(valueToSet)
                  }}
                  selected={p._id === selectedProduct?._id}
                />
              ))}
            </Flex>
            <Flex>
              <MyModal
                title={(selectedProduct ? "Editar " : "Nuevo ") + "producto"}
                mr={2}
              >
                {() => (
                  <ProductForm
                    productId={selectedProduct?._id}
                    refetch={refetch}
                  />
                )}
              </MyModal>
              <MyModal
                title={`Replicar ${selectedProduct?.name || ""}`}
                mr={2}
                colorScheme="green"
                disableButton={!selectedProduct}
              >
                {() => (
                  <ProductForm
                    productId={selectedProduct?._id}
                    refetch={refetch}
                    submitText="Replicar"
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

export default ProductsPanel

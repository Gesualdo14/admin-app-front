import { Button, Flex, Input, useModalContext } from "@chakra-ui/react"
import ProductsList from "./ProductsList"
import { useRef, useState } from "react"
import { Search2Icon } from "@chakra-ui/icons"
import { ProductFromDB } from "schemas/ProductSchema"
import { useFieldArray, useFormContext } from "react-hook-form"
import calcProductPrice from "helpers/calcProductPrice"
import { Sale } from "schemas/SaleSchema"

const ProductSearcher = () => {
  const { control, setValue } = useFormContext<Sale>()
  const { onClose } = useModalContext()
  const { append } = useFieldArray({ control, name: "products" })
  const [searchText, setSearchText] = useState<string | undefined>("")
  const [selectedProducts, setSelectedProducts] = useState<ProductFromDB[]>([])

  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = (p: ProductFromDB) => {
    const alreadyIncluded = selectedProducts.some((sp) => sp._id === p._id)
    if (!alreadyIncluded) {
      setSelectedProducts([...selectedProducts, p])
    } else {
      setSelectedProducts(selectedProducts.filter((prod) => prod._id !== p._id))
    }
  }

  const handleSelect = () => {
    for (const product of selectedProducts) {
      const unit_price = calcProductPrice(product)
      const { code, name, iva, discount } = product

      append({
        code,
        name,
        iva,
        discount,
        qty: 1,
        unit_price,
      })
    }
    setValue("trigger_update", Math.random())
    onClose()
  }

  return (
    <div>
      <form
        onSubmit={() => {
          setSearchText(inputRef?.current?.value)
        }}
      >
        <Flex alignItems="center" gap={2}>
          <Input
            flex={4}
            ref={inputRef}
            placeholder="Buscar por código o nombre..."
          />
          <Button type="submit">
            <Search2Icon flex={1} />
          </Button>
        </Flex>
      </form>
      <ProductsList
        searchText={searchText}
        onClick={handleClick}
        selectedProducts={selectedProducts}
      />
      <Button
        colorScheme="purple"
        isDisabled={selectedProducts.length === 0}
        onClick={handleSelect}
      >
        Finalizar selección
      </Button>
    </div>
  )
}

export default ProductSearcher

import { useFormContext } from "react-hook-form"
import { Divider, Flex, Heading, Text } from "@chakra-ui/react"
import { Sale } from "schemas/SaleSchema"

const ProductsSubtotal = ({ comissions = 0 }) => {
  const { watch } = useFormContext<Sale>()
  const [subtotal, totalIva, discounts] = watch([
    "subtotal",
    "totalIva",
    "discounts",
  ])

  if (!subtotal) return <></>

  const totalBeforeComissions = subtotal + totalIva - discounts
  const finalComissions = Math.min(totalBeforeComissions, comissions)
  const total = totalBeforeComissions - finalComissions

  return (
    <Flex flexDir="column" mt={3}>
      <Heading size="lg" m={0}>
        Resumen
      </Heading>
      <Flex justifyContent="space-between" mt={3}>
        <Text>Subtotal</Text>
        <Text textAlign="end">${subtotal.toFixed(2)}</Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text>Iva</Text>
        <Text textAlign="end">${totalIva?.toFixed(2)}</Text>
      </Flex>
      {discounts > 0 && (
        <Flex justifyContent="space-between">
          <Text>Descuentos de productos</Text>
          <Text textAlign="end" color="green.400">
            -${discounts.toFixed(2)}
          </Text>
        </Flex>
      )}
      {comissions > 0 && (
        <Flex justifyContent="space-between">
          <Text>Descuentos por comisiones</Text>
          <Text textAlign="end" color="green.400">
            -${comissions.toFixed(2)}
          </Text>
        </Flex>
      )}
      <Divider flex={1} />
      <Flex justifyContent="space-between">
        <Text fontWeight="bold">Total</Text>
        <Text textAlign="end">${total.toFixed(2)}</Text>
      </Flex>
    </Flex>
  )
}

export default ProductsSubtotal

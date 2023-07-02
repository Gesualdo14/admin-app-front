import { useFormContext } from "react-hook-form"
import { Divider, Flex, Text } from "@chakra-ui/react"
import { PaymentMethod } from "schemas/SaleSchema"

const PaymentMethodsSubtotal = () => {
  const { watch } = useFormContext()
  const payment_methods = (watch(`payment_methods`) as PaymentMethod[]) || []
  let subtotal = payment_methods.reduce((acc, curr) => acc + curr.amount, 0)
  if (!subtotal) return <></>

  return (
    <Flex flexDir="column">
      <Divider flex={1} />
      <Flex justifyContent="space-between">
        <Text fontWeight="bold">Total</Text>
        <Text textAlign="end">${subtotal.toFixed(2)}</Text>
      </Flex>
    </Flex>
  )
}

export default PaymentMethodsSubtotal

import { Flex, Text } from "@chakra-ui/react"
import MyDeleteIcon from "components/ui/icons/MyDeleteIcon"
import { useFormContext } from "react-hook-form"
import { PaymentMethod, Sale } from "schemas/SaleSchema"

interface Props {
  fieldName: keyof Sale
}

function PaymentMethodAdder({ fieldName }: Props) {
  const { watch } = useFormContext()
  const paymentMethods = watch(fieldName)

  if (!paymentMethods || paymentMethods.length === 0) {
    return <Text mb={5}>No se ha agregado ningún método de pago</Text>
  }

  return (
    <Flex flexDir="column" mb={4}>
      {paymentMethods.map((pm: PaymentMethod, index: number) => (
        <Flex
          key={pm.method}
          gap={3}
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Text>{pm.method}</Text>
          <Flex alignItems="center">
            <Text mr={2}>${pm.amount}</Text>
            <MyDeleteIcon<Sale> fieldName="payment_methods" index={index} />
          </Flex>
        </Flex>
      ))}
    </Flex>
  )
}

export default PaymentMethodAdder

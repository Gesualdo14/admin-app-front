import { Flex, Text } from "@chakra-ui/react"
import MyDeleteIcon from "components/ui/icons/MyDeleteIcon"
import { useFormContext } from "react-hook-form"
import { PaymentMethod, Sale } from "schemas/SaleSchema"
import PaymentMethodsSubtotal from "./PaymentMethodSubtotal"

interface Props {
  fieldName: keyof Sale
  canRemove: boolean
  comissions?: number
}

function PaymentMethodAdder({ fieldName, canRemove }: Props) {
  const { watch } = useFormContext()
  const paymentMethods = watch(fieldName)

  if (!paymentMethods || paymentMethods.length === 0) {
    return (
      <Text mb={5} textAlign="center">
        No se ha agregado ningún método de pago
      </Text>
    )
  }

  return (
    <Flex flexDir="column" mb={4}>
      {paymentMethods.map((pm: PaymentMethod, index: number) => (
        <Flex
          key={index}
          gap={3}
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Flex alignItems="center">
            {canRemove && (
              <MyDeleteIcon<Sale> fieldName="payment_methods" index={index} />
            )}
            <Text ml={2}>{pm.method}</Text>
          </Flex>
          <Text>${pm.amount}</Text>
        </Flex>
      ))}
      <PaymentMethodsSubtotal />
    </Flex>
  )
}

export default PaymentMethodAdder

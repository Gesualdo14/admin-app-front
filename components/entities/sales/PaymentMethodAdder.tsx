import { Flex } from "@chakra-ui/react"
import MyDeleteIcon from "components/ui/icons/MyDeleteIcon"
import MyInput from "components/ui/inputs/MyInput"
import MySelect from "components/ui/selects/MySelect"
import { useFormContext } from "react-hook-form"
import {
  PAYMENT_METHOD_TYPES,
  PaymentMethod,
  Sale,
  TIME_UNITS,
} from "schemas/SaleSchema"

interface Props {
  fieldName: keyof Sale
}

function PaymentMethodAdder({ fieldName }: Props) {
  const { watch } = useFormContext()
  const paymentMethods = watch(fieldName)

  return (
    <Flex flexDir="column" alignItems="flex-end" mb={4}>
      {paymentMethods.map((_: PaymentMethod, index: number) => (
        <Flex gap={3} alignItems="flex-end" mb={5}>
          <MySelect
            fieldName={`payment_methods.${index}.method`}
            label="Método"
            options={PAYMENT_METHOD_TYPES}
          />
          <MyInput
            fieldName={`payment_methods.${index}.amount`}
            label="Valor"
            mb={0}
            showLabel={index === 0}
            valueAsNumber
          />
          <MyInput
            fieldName={`payment_methods.${index}.time_value`}
            label="Plazo"
            mb={0}
            showLabel={index === 0}
            valueAsNumber
          />
          <MySelect
            fieldName={`payment_methods.${index}.time_unit`}
            label="Período"
            options={Object.keys(TIME_UNITS.Enum)}
          />
          <MyDeleteIcon<Sale> fieldName="payment_methods" index={index} />
        </Flex>
      ))}
    </Flex>
  )
}

export default PaymentMethodAdder

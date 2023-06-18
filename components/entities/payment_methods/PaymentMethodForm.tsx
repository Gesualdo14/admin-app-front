import { Button, Flex, useModalContext } from "@chakra-ui/react"
import MyForm from "components/ui/forms/MyForm"
import MyInput from "components/ui/inputs/MyInput"
import MySelect from "components/ui/selects/MySelect"
import {
  PAYMENT_METHOD_TYPES,
  PaymentMethod,
  TIME_UNITS,
  salePaymentMethodSchema,
} from "schemas/SaleSchema"
import { useFieldArray, useFormContext } from "react-hook-form"

const PaymentMethodForm = () => {
  const { onClose } = useModalContext()
  const { watch, control } = useFormContext()
  const { append } = useFieldArray({ control, name: "payment_methods" })
  const products = watch("products")

  return (
    <MyForm<PaymentMethod>
      zodSchema={salePaymentMethodSchema}
      onSubmit={(data) => {
        console.log("HOLA")
        append(data)
        onClose()
      }}
      onError={(data) => console.log({ data })}
      defaultValues={{
        method: "Sin utilización Sist. Financiero",
        amount: 0,
        time_value: 0,
        time_unit: "Meses",
      }}
    >
      <Flex flexDir="column" gap={3} mb={5}>
        <MySelect
          fieldName="method"
          label="Método"
          options={PAYMENT_METHOD_TYPES}
        />
        <MyInput<PaymentMethod>
          fieldName="amount"
          label="Valor"
          mb={0}
          valueAsNumber
        />
        <MyInput<PaymentMethod>
          fieldName="time_value"
          label="Plazo"
          mb={0}
          valueAsNumber
        />
        <MySelect<PaymentMethod>
          fieldName="time_unit"
          label="Período"
          options={Object.keys(TIME_UNITS.Enum)}
        />
        <Button type="submit">Agregar</Button>
      </Flex>
    </MyForm>
  )
}

export default PaymentMethodForm

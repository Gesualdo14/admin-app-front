import { Flex } from "@chakra-ui/react"
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
import PMFormButtons from "./PMFormButtons"

const PaymentMethodForm = ({ onClose }: { onClose?: () => void }) => {
  const { control } = useFormContext()
  const { append } = useFieldArray({ control, name: "payment_methods" })

  return (
    <MyForm<PaymentMethod>
      zodSchema={salePaymentMethodSchema}
      onSubmit={() => {}}
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
      </Flex>
      <PMFormButtons append={append} onClose={onClose} />
    </MyForm>
  )
}

export default PaymentMethodForm

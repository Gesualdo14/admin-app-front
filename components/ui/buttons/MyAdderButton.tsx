import { Button } from "@chakra-ui/react"
import { useFieldArray, useFormContext } from "react-hook-form"
import { PaymentMethod, ProductForState, Sale } from "schemas/SaleSchema"

interface DefaultValues {
  [key: string]: PaymentMethod | ProductForState
}

export const defaultPM: PaymentMethod = {
  method: "Sin utilización Sist. Financiero",
  amount: 0,
  time_unit: "Meses",
  time_value: 0,
}
export const defaultProduct: ProductForState = {
  code: "",
  name: "",
  iva: 0,
  unit_price: 0,
}

const DEFAULT_VALUES: DefaultValues = {
  payment_methods: defaultPM,
  products: defaultProduct,
}

interface Props {
  fieldName: keyof Sale
}

const MyAdderButton = ({ fieldName }: Props) => {
  const { control } = useFormContext()
  const { append } = useFieldArray({ control, name: fieldName })

  const defaultValue = DEFAULT_VALUES[fieldName]

  return (
    <Button
      size="xs"
      fontSize="1rem"
      lineHeight="1rem"
      py={4}
      colorScheme="blue"
      onClick={() => append(defaultValue)}
    >
      Agregar
    </Button>
  )
}

export default MyAdderButton

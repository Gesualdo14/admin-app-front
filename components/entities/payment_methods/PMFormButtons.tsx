import { Button } from "@chakra-ui/react"
import { UseFieldArrayAppend, FieldValues } from "react-hook-form/dist/types"
import { PaymentMethod } from "schemas/SaleSchema"
import { useFormContext } from "react-hook-form"

interface Props {
  getValues?: () => void
  append?: UseFieldArrayAppend<FieldValues, "payment_methods">
  onClose?: () => void
}

const PMFormButtons = ({ append, onClose }: Props) => {
  const { getValues, setError } = useFormContext<PaymentMethod>()
  return (
    <Button
      colorScheme="purple"
      onClick={() => {
        if (getValues) {
          const pm = getValues()
          const { time_value, time_unit, ...cleanedPM } = pm
          const pmToAppend = pm.method === "Tarjeta de crédito" ? pm : cleanedPM
          if (cleanedPM.amount <= 0) {
            setError("amount", { message: "El valor debe ser mayor a 0" })
            return
          }
          append && append(pmToAppend)
          onClose && onClose()
        }
      }}
    >
      Agregar
    </Button>
  )
}

export default PMFormButtons

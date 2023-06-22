import { Button } from "@chakra-ui/react"
import { UseFieldArrayAppend, FieldValues } from "react-hook-form/dist/types"

interface Props {
  getValues?: () => void
  append?: UseFieldArrayAppend<FieldValues, "payment_methods">
  onClose?: () => void
}

const PMFormButtons = ({ getValues, append, onClose }: Props) => {
  console.log({ getValues })
  return (
    <Button
      colorScheme="purple"
      onClick={() => {
        if (getValues) {
          const data = getValues()
          append && append(data)
          onClose && onClose()
        }
      }}
    >
      Agregar
    </Button>
  )
}

export default PMFormButtons

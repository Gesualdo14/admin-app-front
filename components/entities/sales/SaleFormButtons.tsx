import { Button, ButtonGroup } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useFormContext } from "react-hook-form"

interface Props {
  saleId: string | undefined
  getValues?: () => void
  onSubmit?: (data: any, reset: any) => void
  reset?: () => void
  onClose?: () => void
}

const SaleFormButtons = ({ saleId, onSubmit, onClose }: Props) => {
  const { getValues, reset } = useFormContext()

  return (
    <ButtonGroup>
      <Button
        colorScheme="purple"
        onClick={() => {
          if (getValues) {
            const data = getValues()
            onSubmit && onSubmit(data, reset)
          }
        }}
      >
        {!!saleId ? "Guardar cambios" : "Crear"}
      </Button>
      <Button colorScheme="gray" onClick={() => onClose && onClose()}>
        Cerrar
      </Button>
    </ButtonGroup>
  )
}

export default SaleFormButtons

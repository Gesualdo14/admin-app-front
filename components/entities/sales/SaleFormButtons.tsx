import { Button, ButtonGroup, Spinner } from "@chakra-ui/react"
import { useFormContext } from "react-hook-form"

interface Props {
  saleId: string | undefined
  getValues?: () => void
  onSubmit?: (data: any, reset: any) => void
  reset?: () => void
  onClose?: () => void
}

const SaleFormButtons = ({ saleId, onClose }: Props) => {
  const {
    formState: { isSubmitting },
  } = useFormContext()

  console.log({ isSubmitting })

  return (
    <ButtonGroup mt={5}>
      {isSubmitting ? (
        <Spinner />
      ) : (
        <Button colorScheme="purple" type="submit">
          {!!saleId ? "Guardar cambios" : "Crear"}
        </Button>
      )}
      <Button colorScheme="gray" onClick={() => onClose && onClose()}>
        Cerrar
      </Button>
    </ButtonGroup>
  )
}

export default SaleFormButtons

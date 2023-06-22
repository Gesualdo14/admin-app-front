import { Button, ButtonGroup } from "@chakra-ui/react"
import { useRouter } from "next/router"

interface Props {
  saleId: string | undefined
  getValues?: () => void
  onSubmit?: (data: any, reset: any) => void
  reset?: () => void
}

const SaleFormButtons = ({ saleId, getValues, onSubmit, reset }: Props) => {
  const router = useRouter()

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
      <Button colorScheme="gray" onClick={() => router.back()}>
        Volver
      </Button>
    </ButtonGroup>
  )
}

export default SaleFormButtons

import { Button, ButtonGroup } from "@chakra-ui/react"
import { useRouter } from "next/router"

interface Props {
  saleId: string | undefined
}

const SaleFormButtons = ({ saleId }: Props) => {
  const router = useRouter()
  return (
    <ButtonGroup>
      <Button colorScheme="purple" type="submit">
        {!!saleId ? "Guardar cambios" : "Crear"}
      </Button>
      <Button colorScheme="gray" onClick={() => router.back()}>
        Volver
      </Button>
    </ButtonGroup>
  )
}

export default SaleFormButtons

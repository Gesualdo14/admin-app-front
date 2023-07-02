import { Button, Spinner } from "@chakra-ui/react"
import { useFormContext } from "react-hook-form"
import { Client } from "schemas/ClientSchema"

interface Props {
  editing: boolean
}

const ClientButtons = ({ editing }: Props) => {
  const {
    formState: { isSubmitting },
  } = useFormContext<Client>()
  return (
    <Button colorScheme="purple" type="submit" mb={2}>
      {isSubmitting ? <Spinner /> : !!editing ? "Guardar cambios" : "Crear"}
    </Button>
  )
}

export default ClientButtons

import { Button, Spinner } from "@chakra-ui/react"
import { FieldValues, useFormContext } from "react-hook-form"

interface Props {
  editing: boolean
  submitText?: string
}

const SubmitButtons = <T extends FieldValues>({
  editing,
  submitText,
}: Props) => {
  const { formState } = useFormContext<T>()

  let finalText = !!editing ? "Guardar cambios" : "Crear"
  if (submitText) {
    finalText = submitText
  }
  return (
    <Button colorScheme="purple" type="submit" mb={2}>
      {formState.isSubmitting ? <Spinner /> : finalText}
    </Button>
  )
}

export default SubmitButtons

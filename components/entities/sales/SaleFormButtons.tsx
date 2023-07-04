import { Button, ButtonGroup, Spinner } from "@chakra-ui/react"
import { useFormContext } from "react-hook-form"
import { Sale } from "schemas/SaleSchema"

interface Props {
  saleId: string | undefined
  getValues?: () => void
  onSubmit?: (data: any, reset: any) => void
  reset?: () => void
  onClose?: () => void
  comissions?: number
}

const SaleFormButtons = ({ saleId, onClose, comissions = 0 }: Props) => {
  const {
    watch,
    formState: { isSubmitting },
  } = useFormContext<Sale>()

  const [subtotal, totalIva, discounts, pm] = watch([
    "subtotal",
    "totalIva",
    "discounts",
    "payment_methods",
  ])

  const payments = pm?.map((p) => p.amount).reduce((a, b) => a + b, 0) || 0
  const totalBeforeComissions = subtotal + totalIva - discounts
  const finalComissions = Math.min(totalBeforeComissions, comissions)
  const total = totalBeforeComissions - finalComissions

  return (
    <ButtonGroup mt={5}>
      {!saleId && (
        <Button
          colorScheme="purple"
          type="submit"
          isDisabled={
            !payments || !total || total.toFixed(2) !== payments.toFixed(2)
          }
        >
          {isSubmitting ? <Spinner /> : "Crear"}
        </Button>
      )}
      <Button colorScheme="gray" onClick={() => onClose && onClose()}>
        Cerrar
      </Button>
    </ButtonGroup>
  )
}

export default SaleFormButtons

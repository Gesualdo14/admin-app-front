import { PaymentMethod } from "schemas/SaleSchema"

interface DefaultValues {
  [key: string]: PaymentMethod
}

const DEFAULT_VALUES: DefaultValues = {
  payment_method: {
    method: "Sin utilización Sist. Financiero",
    amount: 0,
    time_unit: "Meses",
    time_value: 0,
  },
} as const

export default DEFAULT_VALUES

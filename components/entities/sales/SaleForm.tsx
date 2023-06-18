import { Divider, Flex, Heading, useModalContext } from "@chakra-ui/react"
import axios from "axios"
import { useRouter } from "next/router"
import { env } from "~/env.mjs"
import "react-datepicker/dist/react-datepicker.css"
import getDateForInput from "helpers/getDateForInput"
import { ProductFormProps, Sale, saleSchema } from "schemas/SaleSchema"
import MyForm from "components/ui/forms/MyForm"
import ProductAdder from "../products/ProductAdder"
import PaymentMethodAdder from "../payment_methods/PaymentMethodAdder"
import SaleFormButtons from "./SaleFormButtons"
import MyModal from "components/ui/modals/MyModal"
import ProductSearcher from "../products/ProductSearcher"
import PaymentMethodForm from "../payment_methods/PaymentMethodForm"

const SaleForm = ({ saleId, clientId }: ProductFormProps) => {
  const { onClose } = useModalContext()

  const onSubmit = async (data: Sale, reset: any) => {
    console.log("HOLI")
    if (!clientId) return
    const PARAMS = !!saleId ? `/${saleId}` : ""
    const res = await axios(
      `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/sales${PARAMS}`,
      {
        method: !!saleId ? "PUT" : "POST",
        data: { ...data, client: clientId },
        withCredentials: true,
      }
    )
    reset()
    onClose()
  }

  const onError = (errors: any) => console.log(errors)

  const setDefaultValues = async () => {
    console.log({ saleId })
    if (!saleId) {
      return { operation_date: getDateForInput() }
    }

    const { data } = await axios.get(
      `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/sales/${saleId}`,
      { withCredentials: true }
    )

    return {
      ...data.data,
      operation_date: getDateForInput(data?.data?.operation_date),
    }
  }

  return (
    <>
      <MyForm
        onSubmit={onSubmit}
        onError={onError}
        zodSchema={saleSchema}
        defaultValues={setDefaultValues}
      >
        <Flex alignItems="center" justifyContent={"space-between"}>
          <Heading size="lg">Productos</Heading>
          <MyModal title="Elegir productos" buttonText="Agregar" size="xs">
            <ProductSearcher />
          </MyModal>
        </Flex>
        <Divider mb="3" mt="2" />
        <ProductAdder fieldName="products" />
        <Flex alignItems="center" justifyContent={"space-between"} mt="8">
          <Heading size="lg">Forma de pago</Heading>
          <MyModal title="Elegir medio de pago" buttonText="Agregar" size="xs">
            <PaymentMethodForm />
          </MyModal>
        </Flex>
        <Divider mb="3" mt="2" />
        <PaymentMethodAdder fieldName="payment_methods" />
        <SaleFormButtons saleId={saleId} />
      </MyForm>
    </>
  )
}

export default SaleForm

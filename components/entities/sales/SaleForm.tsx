import { Flex, Heading } from "@chakra-ui/react"
import axios, { AxiosResponse } from "axios"
import { env } from "~/env.mjs"
import "react-datepicker/dist/react-datepicker.css"
import getDateForInput from "helpers/getDateForInput"
import { SaleFormProps, Sale, SaleFromDB, saleSchema } from "schemas/SaleSchema"
import MyForm from "components/ui/forms/MyForm"
import ProductAdder from "../products/ProductAdder"
import PaymentMethodAdder from "../payment_methods/PaymentMethodAdder"
import SaleFormButtons from "./SaleFormButtons"
import MyModal from "components/ui/modals/MyModal"
import ProductSearcher from "../products/ProductSearcher"
import PaymentMethodForm from "../payment_methods/PaymentMethodForm"
import { ApiResponse } from "schemas/ApiSchema"
import ProductsSubtotal from "../products/ProductsSubtotal"
import MyInput from "components/ui/inputs/MyInput"
import SaleFormUpdater from "./SaleFormUpdater"

const SaleForm = ({ saleId, clientId, refetch, onClose }: SaleFormProps) => {
  const onSubmit = async (data: Sale, reset: any): Promise<void> => {
    if (!clientId) return
    const PARAMS = !!saleId ? `/${saleId}` : ""
    await axios<any, AxiosResponse<ApiResponse<SaleFromDB>>>(
      `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/sales${PARAMS}`,
      {
        method: !!saleId ? "PUT" : "POST",
        data: { ...data, client: clientId },
        withCredentials: true,
      }
    )
    refetch && refetch()
    reset()
    onClose && onClose()
  }

  const onError = (errors: any) => console.log(errors)

  const setDefaultValues = async () => {
    if (!saleId) {
      return {
        operation_date: getDateForInput(),
        subtotal: 0,
        totalIva: 0,
        discounts: 0,
        products: [],
        payment_methods: [],
      }
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
        <SaleFormUpdater />
        <MyInput type="hidden" fieldName="subtotal" label="" valueAsNumber />
        <MyInput type="hidden" fieldName="iva" label="" valueAsNumber />
        <MyInput type="hidden" fieldName="discounts" label="" valueAsNumber />
        <Flex alignItems="center" justifyContent={"space-between"} mb={3}>
          <Heading size="lg" m={0}>
            Productos
          </Heading>
          <MyModal title="Elegir productos" buttonText="Agregar" size="xs">
            {() => <ProductSearcher />}
          </MyModal>
        </Flex>
        {/* <Divider mb="3" mt="2" /> */}
        <ProductAdder />
        <ProductsSubtotal />
        <Flex
          alignItems="center"
          justifyContent={"space-between"}
          mt="8"
          mb={3}
        >
          <Heading size="lg" m={0}>
            Forma de pago
          </Heading>
          <MyModal title="Elegir medio de pago" buttonText="Agregar" size="xs">
            {({ onClose }) => <PaymentMethodForm onClose={onClose} />}
          </MyModal>
        </Flex>
        {/* <Divider mb="3" mt="2" /> */}
        <PaymentMethodAdder fieldName="payment_methods" />

        <SaleFormButtons saleId={saleId} onClose={onClose} />
      </MyForm>
    </>
  )
}

export default SaleForm

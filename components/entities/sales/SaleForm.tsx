import { Card, Divider, Flex, Heading, Text } from "@chakra-ui/react"
import axios from "axios"
import { useRouter } from "next/router"
import { env } from "~/env.mjs"
import { useState } from "react"
import "react-datepicker/dist/react-datepicker.css"
import getDateForInput from "helpers/getDateForInput"
import { ProductFormProps, Sale, saleSchema } from "schemas/SaleSchema"
import MyForm from "components/ui/forms/MyForm"
import MyInput from "components/ui/inputs/MyInput"
import ProductAdder from "./ProductAdder"
import PaymentMethodAdder from "./PaymentMethodAdder"
import MyAdderButton, {
  defaultPM,
  defaultProduct,
} from "components/ui/buttons/MyAdderButton"
import SaleFormButtons from "./SaleFormButtons"

const SaleForm = ({ saleId }: ProductFormProps) => {
  const [totalAmount, setTotalAmount] = useState(0)

  const [foundClient, setFoundClient] = useState<{
    _id: string
    firstname: string
  } | null>(null)

  const router = useRouter()

  const onSubmit = async (data: Sale, reset: any) => {
    if (!foundClient) return
    const PARAMS = !!saleId ? `/${saleId}` : ""
    const res = await axios(
      `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/sales${PARAMS}`,
      {
        method: !!saleId ? "PUT" : "POST",
        data: { ...data, client: foundClient._id, total_amount: totalAmount },
        withCredentials: true,
      }
    )
    reset()
    console.log({ res })
    router.push("/")
  }

  const onError = (errors: any) => console.log(errors)

  const setDefaultValues = async () => {
    console.log({ saleId })
    if (!saleId) {
      return {
        operation_date: getDateForInput(),
        payment_methods: [defaultPM],
        products: [defaultProduct],
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
        <Flex gap={3} alignItems="center">
          <MyInput<Sale>
            fieldName="client_document"
            label="Documento del cliente"
            searchFn={async (document) => {
              if (!document) return
              const { data } = await axios.get(
                `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/clients/document/${document}`,
                { withCredentials: true }
              )
              setFoundClient(data.data)
            }}
          />
        </Flex>
        {!!foundClient && (
          <Card mb={5} p={3}>
            <Text>{foundClient?.firstname}</Text>
          </Card>
        )}
        <MyInput<Sale>
          fieldName="operation_date"
          label="Fecha de la operación"
          type="date"
          valueAsDate
        />
        <Flex alignItems="center" justifyContent={"space-between"} mt="8">
          <Heading size="lg">Productos</Heading>
          <MyAdderButton fieldName="products" />
        </Flex>
        <Divider mb="3" mt="2" />
        <ProductAdder fieldName="products" />
        <Flex alignItems="center" justifyContent={"space-between"} mt="8">
          <Heading size="lg">Forma de pago</Heading>
          <MyAdderButton fieldName="payment_methods" />
        </Flex>
        <Divider mb="3" mt="2" />
        <PaymentMethodAdder fieldName="payment_methods" />
        <SaleFormButtons saleId={saleId} />
      </MyForm>
    </>
  )
}

export default SaleForm

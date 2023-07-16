import { Flex, useModalContext, useToast } from "@chakra-ui/react"
import axios, { AxiosResponse } from "axios"
import MyForm from "components/ui/forms/MyForm"
import MyInput from "components/ui/inputs/MyInput"
import type { FieldValues } from "react-hook-form"
import { ApiResponse } from "schemas/ApiSchema"
import {
  ProductSchema,
  type ProductFromDB,
  Product,
} from "schemas/ProductSchema"
import { env } from "~/env.mjs"
import SubmitButtons from "components/ui/buttons/SubmitButtons"
import { ProductForState } from "schemas/SaleSchema"

interface Props {
  productId: string | undefined
  submitText?: string
  refetch?: () => void
}

const ProductForm = ({ productId, refetch, submitText }: Props) => {
  const { onClose } = useModalContext()
  const toast = useToast()

  const onSubmit = async (state: Product, reset: () => void) => {
    const editing = !!productId && !submitText
    const PARAMS = editing ? `/${productId}` : ""
    try {
      await axios<any, AxiosResponse<ApiResponse<ProductFromDB>>>(
        `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/products${PARAMS}`,
        {
          method: editing ? "PUT" : "POST",
          data: state,
          withCredentials: true,
        }
      )
      reset()
      onClose()
      refetch && refetch()
    } catch (error: any) {
      console.log({ error })
      toast({ title: error.response.data.message, status: "warning" })
    }
  }

  const onError = (errors: FieldValues) => {
    console.log({ errors })
  }

  const setDefaultValues = async () => {
    if (!productId)
      return {
        iva: 0.12,
        micro: 5.55,
        profit_margin: 0.15,
        salvament_margin: 0.25,
        discount: 0,
      }

    const { data } = await axios.get(
      `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/${productId}`,
      { withCredentials: true }
    )

    const { _id, sold, ...product } = data.data // eliminar una propiedad de un objeto

    return product
  }

  return (
    <MyForm
      onSubmit={onSubmit}
      onError={onError}
      zodSchema={ProductSchema}
      defaultValues={setDefaultValues}
    >
      <MyInput<Product> fieldName="name" label="Denominación" />
      <MyInput<Product> fieldName="code" label="Código" />
      <MyInput<Product>
        fieldName="supplier_cost"
        label="Costo proveedor"
        valueAsNumber
      />

      <Flex gap={2}>
        <MyInput<Product> fieldName="iva" label="Iva" valueAsNumber />
        <MyInput<Product> fieldName="micro" label="Micro" valueAsNumber />
      </Flex>
      <Flex gap={3} mb={5}>
        <MyInput<Product>
          fieldName="profit_margin"
          label="Profit %"
          valueAsNumber
        />
        <MyInput<Product>
          fieldName="salvament_margin"
          label="Salvament %"
          valueAsNumber
        />
      </Flex>
      <MyInput<Product>
        fieldName="discount"
        label="Descuento"
        placeholder="Entre 0 y 1"
        valueAsNumber
      />
      <SubmitButtons<ProductForState>
        editing={!!productId}
        submitText={submitText}
      />
    </MyForm>
  )
}

export default ProductForm

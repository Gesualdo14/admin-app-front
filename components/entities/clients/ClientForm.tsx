import { Flex, useModalContext, useToast } from "@chakra-ui/react"
import axios, { AxiosResponse } from "axios"
import MyForm from "components/ui/forms/MyForm"
import MyInput from "components/ui/inputs/MyInput"
import MySelect from "components/ui/selects/MySelect"
import type { FieldValues } from "react-hook-form"
import { ApiResponse } from "schemas/ApiSchema"
import type {
  Client,
  ClientFormProps,
  ClientFromDB,
} from "schemas/ClientSchema"
import { ClientSchema, DOC_TYPES } from "schemas/ClientSchema"
import { env } from "~/env.mjs"
import ClientButtons from "./ClientButtons"

const ClientForm = ({ clientId, refetch }: ClientFormProps) => {
  const { onClose } = useModalContext()
  const toast = useToast()
  const onSubmit = async (state: Client, reset: () => void) => {
    const PARAMS = !!clientId ? `/${clientId}` : ""

    try {
      await axios<any, AxiosResponse<ApiResponse<ClientFromDB>>>(
        `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/clients${PARAMS}`,
        {
          method: !!clientId ? "PUT" : "POST",
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
    if (!clientId) return { phoneCode: "593" }

    const { data } = await axios.get(
      `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/clients/${clientId}`,
      { withCredentials: true }
    )

    return data.data
  }

  return (
    <MyForm
      onSubmit={onSubmit}
      onError={onError}
      zodSchema={ClientSchema}
      defaultValues={setDefaultValues}
    >
      <MyInput<Client> fieldName="firstname" label="Nombre" />
      <MyInput<Client> fieldName="lastname" label="Apellido" />
      <MyInput<Client> fieldName="email" label="Email" />
      <Flex gap={2}>
        <MyInput<Client> fieldName="phoneCode" label="Cod. País" flex={1} />
        <MyInput<Client>
          fieldName="phoneNumber"
          label="Nro. de teléfono"
          flex={2}
        />
      </Flex>
      <Flex gap={3} mb={5}>
        <MySelect<Client>
          fieldName="document_type"
          label="Tipo de documento"
          options={DOC_TYPES}
        />
        <MyInput fieldName="document_value" label="Documento" mb={0} />
      </Flex>
      <ClientButtons editing={!!clientId} />
    </MyForm>
  )
}

export default ClientForm

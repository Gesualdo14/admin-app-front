import { Button, Flex, useModalContext } from "@chakra-ui/react"
import axios from "axios"
import MyForm from "components/ui/forms/MyForm"
import MyInput from "components/ui/inputs/MyInput"
import MySelect from "components/ui/selects/MySelect"
import { FieldValues } from "react-hook-form"
import type { Client, ClientFormProps } from "schemas/ClientSchema"
import { ClientSchema, DOC_TYPES } from "schemas/ClientSchema"
import { env } from "~/env.mjs"

const ClientForm = ({ clientId }: ClientFormProps) => {
  const { onClose } = useModalContext()

  const onSubmit = async (data: Client, reset: any) => {
    const PARAMS = !!clientId ? `/${clientId}` : ""
    const res = await axios(
      `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/clients${PARAMS}`,
      {
        method: !!clientId ? "PUT" : "POST",
        data,
        withCredentials: true,
      }
    )
    reset()
    onClose()
  }

  const onError = (errors: FieldValues) => {}

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
      <Button colorScheme="purple" type="submit" mb={2}>
        {!!clientId ? "Guardar cambios" : "Crear"}
      </Button>
    </MyForm>
  )
}

export default ClientForm

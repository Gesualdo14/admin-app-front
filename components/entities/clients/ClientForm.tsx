import { Button, ButtonGroup, Flex } from "@chakra-ui/react"
import axios from "axios"
import MyForm from "components/ui/forms/MyForm"
import MyInput from "components/ui/inputs/MyInput"
import MySelect from "components/ui/selects/MySelect"
import { useRouter } from "next/router"
import {
  Client,
  ClientFormProps,
  ClientSchema,
  DOC_TYPES,
} from "schemas/ClientSchema"
import { env } from "~/env.mjs"

const ClientForm = ({ clientId }: ClientFormProps) => {
  const router = useRouter()
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
    console.log({ res })
    router.push("/clients")
  }

  const onError = () => console.log("Errors")

  const setDefaultValues = async () => {
    if (!clientId) return {}

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
      <Flex gap={3} mb={5}>
        <MySelect<Client>
          fieldName="document_type"
          label="Tipo de documento"
          options={DOC_TYPES}
        />
        <MyInput fieldName="document_value" label="Documento" mb={0} />
      </Flex>
      <ButtonGroup>
        <Button colorScheme="purple" type="submit">
          {!!clientId ? "Guardar cambios" : "Crear"}
        </Button>
        <Button colorScheme="gray" onClick={() => router.back()}>
          Volver
        </Button>
      </ButtonGroup>
    </MyForm>
  )
}

export default ClientForm

import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Spinner,
} from "@chakra-ui/react"
import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { env } from "~/env.mjs"

const DOC_TYPES = [
  "RUC",
  "Cédula",
  "Pasaporte",
  "Identificación Exterior",
] as const

const schema = z.object({
  firstname: z.string().min(3),
  lastname: z.string().min(3),
  email: z.string().email("Email inválido"),
  document_type: z.enum(DOC_TYPES),
  document_value: z.string().min(4),
})

export type Client = z.infer<typeof schema>

interface Props {
  clientId?: string
}

const ClientForm = ({ clientId }: Props) => {
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<Client>({
    resolver: zodResolver(schema),
    defaultValues: async () => {
      if (!clientId) return {}

      const { data } = await axios.get(
        `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/clients/${clientId}`,
        { withCredentials: true }
      )

      return data.data
    },
  })
  const router = useRouter()

  const onSubmit = async (data: Client) => {
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

  if (isLoading)
    return (
      <Flex height={20} alignItems="center" justifyContent="center">
        <Spinner alignSelf="center" colorScheme="purple" color="purple" />
      </Flex>
    )

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb={5} isInvalid={!!errors.firstname}>
          <FormLabel>Nombre</FormLabel>
          <Input type="text" placeholder="Nombre" {...register("firstname")} />
          <FormErrorMessage>{errors.firstname?.message}</FormErrorMessage>
        </FormControl>
        <FormControl mb={5} isInvalid={!!errors.lastname}>
          <FormLabel>Apellido</FormLabel>
          <Input type="text" placeholder="Apellido" {...register("lastname")} />
          <FormErrorMessage>{errors.lastname?.message}</FormErrorMessage>
        </FormControl>
        <FormControl mb={5} isInvalid={!!errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            type="text"
            placeholder="Ingresa tu email"
            {...register("email")}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <Flex gap={3}>
          <FormControl flex={7}>
            <FormLabel>Tipo de documento</FormLabel>
            <Select placeholder="Seleccionar" {...register("document_type")}>
              {DOC_TYPES.map((dt) => (
                <option key={dt} value={dt}>
                  {dt}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl flex={6} mb={5} isInvalid={!!errors.document_value}>
            <FormLabel>Documento</FormLabel>
            <Input
              type="text"
              placeholder="Documento"
              {...register("document_value")}
            />
            <FormErrorMessage>
              {errors.document_value?.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>
        <ButtonGroup>
          <Button colorScheme="purple" type="submit">
            {!!clientId ? "Guardar cambios" : "Crear"}
          </Button>
          <Button colorScheme="gray" onClick={() => router.back()}>
            Volver
          </Button>
        </ButtonGroup>
      </form>
      <DevTool control={control} />
    </>
  )
}

export default ClientForm

import { NextPage } from "next"
import {
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  Card,
  Button,
  ButtonGroup,
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { env } from "~/env.mjs"
import { useRouter } from "next/router"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
  email: z.string().email("Email inválido"),
  code: z.string().length(6, "El código debe tener 6 caracteres"),
})

type FieldValues = z.infer<typeof schema>

const Login: NextPage = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "ignaciogesualdo@gmail.com" },
  })

  const router = useRouter()

  const onSubmit = () => {
    const { email, code } = getValues()
    console.log({ email, code })
    axios
      .post(
        `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/login/${email}`,
        { code },
        { withCredentials: true }
      )
      .then(({ data }) => {
        router.push("/")
      })
      .catch((error) => console.log(error))
  }

  const onError = () => {
    console.log({ errors })
  }

  return (
    <Container marginTop={10}>
      <Heading textAlign="center">Iniciar sesión</Heading>
      <Card padding={3} maxWidth="">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <FormControl marginBottom={5} isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="text"
              placeholder="Ingresa tu email"
              {...register("email")}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.code}>
            <FormLabel>Código</FormLabel>
            <Input
              type="number"
              placeholder="Ingresa tu código"
              {...register("code", { required: true, minLength: 6 })}
            />
            <FormErrorMessage>{errors.code?.message}</FormErrorMessage>
          </FormControl>
          <ButtonGroup marginTop={8} justifyContent="center">
            <Button type="submit">Iniciar sesión</Button>{" "}
            <Button
              onClick={() => {
                const email = getValues("email")

                axios
                  .post(
                    `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/login/${email}/code`
                  )
                  .then(console.log)
                  .catch(console.log)
              }}
            >
              Quiero un código
            </Button>
          </ButtonGroup>
        </form>
      </Card>
    </Container>
  )
}

export default Login

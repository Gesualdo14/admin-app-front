import { NextPage } from "next"
import { Container, Heading, Card, useToast } from "@chakra-ui/react"
import axios, { AxiosError } from "axios"
import { env } from "~/env.mjs"
import { useRouter } from "next/router"
import MyForm from "components/ui/forms/MyForm"
import MyInput from "components/ui/inputs/MyInput"
import LoginButtons from "components/entities/users/LoginButtons"
import { Login, LoginSchema } from "schemas/AuthSchema"
import useAuth from "hooks/useAuth"

const Login: NextPage = () => {
  const { setUser } = useAuth()
  const toast = useToast()
  const router = useRouter()

  const onSubmit = async (data: Login) => {
    const { email, code } = data
    try {
      const { data } = await axios.post(
        `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/login/${email}`,
        { code },
        { withCredentials: true }
      )
      const tokenPayload = data.data
      localStorage.setItem("user", JSON.stringify(tokenPayload))
      setUser(tokenPayload)
      router.push("/")
    } catch (error) {
      console.log({ error })
      if (error instanceof AxiosError) {
        if (error?.response?.status === 400) {
          toast({
            title: error.response.data.message,
            status: "warning",
            position: "top",
          })
        } else {
          toast({
            title: "Error de servidor",
            description: error.message,
            status: "error",
            position: "top",
          })
        }
      }
    }
  }

  const onError = (errors: any) => {
    console.log({ errors })
  }

  return (
    <Container marginTop={10}>
      <Card padding={3} maxWidth="">
        <Heading textAlign="center" mb={4}>
          Iniciar sesión
        </Heading>
        <MyForm zodSchema={LoginSchema} onSubmit={onSubmit} onError={onError}>
          <MyInput fieldName="email" label="Email" />
          <MyInput fieldName="code" label="Código" />
          <LoginButtons />
        </MyForm>
      </Card>
    </Container>
  )
}

export default Login

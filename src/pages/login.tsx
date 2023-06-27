import { NextPage } from "next"
import { Container, Heading, Card } from "@chakra-ui/react"
import axios from "axios"
import { env } from "~/env.mjs"
import { useRouter } from "next/router"
import MyForm from "components/ui/forms/MyForm"
import MyInput from "components/ui/inputs/MyInput"
import LoginButtons from "components/entities/users/LoginButtons"
import { Login, LoginSchema } from "schemas/AuthSchema"
import useAuth from "hooks/useAuth"

const Login: NextPage = () => {
  const { setUser } = useAuth()
  const router = useRouter()

  const onSubmit = (data: Login) => {
    const { email, code } = data
    axios
      .post(
        `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/login/${email}`,
        { code },
        { withCredentials: true }
      )
      .then(({ data }) => {
        const tokenPayload = data.data
        localStorage.setItem("user", JSON.stringify(tokenPayload))
        setUser(tokenPayload)
        router.push("/")
      })
      .catch((error) => console.log(error))
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
        <MyForm
          defaultValues={{ email: "ignaciogesualdo@gmail.com" }}
          zodSchema={LoginSchema}
          onSubmit={onSubmit}
          onError={onError}
        >
          <MyInput fieldName="email" label="Email" />
          <MyInput fieldName="code" label="Código" />
          <LoginButtons />
        </MyForm>
      </Card>
    </Container>
  )
}

export default Login

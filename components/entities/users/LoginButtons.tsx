import { Button, ButtonGroup } from "@chakra-ui/react"
import axios from "axios"
import { useFormContext } from "react-hook-form"
import { env } from "~/env.mjs"

const LoginButtons = () => {
  const { getValues } = useFormContext()
  return (
    <ButtonGroup marginTop={8} justifyContent="center">
      <Button type="submit" colorScheme="purple">
        Iniciar sesión
      </Button>{" "}
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
  )
}

export default LoginButtons

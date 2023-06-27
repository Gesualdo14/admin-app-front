import { CheckIcon } from "@chakra-ui/icons"
import { Button, ButtonGroup, useToast } from "@chakra-ui/react"
import axios from "axios"
import { useFormContext } from "react-hook-form"
import { Client } from "schemas/ClientSchema"
import { env } from "~/env.mjs"

const LoginButtons = () => {
  const toast = useToast()
  const { getValues } = useFormContext<Client>()
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
            .then(({ data }) => {
              toast({
                description: data.message,
                status: "success",
                icon: <CheckIcon />,
                position: "top",
              })
            })
            .catch(console.log)
        }}
      >
        Quiero un código
      </Button>
    </ButtonGroup>
  )
}

export default LoginButtons

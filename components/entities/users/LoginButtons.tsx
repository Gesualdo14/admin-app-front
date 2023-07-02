import { CheckIcon } from "@chakra-ui/icons"
import { Button, ButtonGroup, Spinner, useToast } from "@chakra-ui/react"
import axios from "axios"
import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { Login } from "schemas/AuthSchema"
import { env } from "~/env.mjs"

const LoginButtons = () => {
  const [gettingCode, setGettingCode] = useState(false)
  const toast = useToast()
  const {
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useFormContext<Login>()

  const email = watch("email")
  const code = watch("code")
  return (
    <ButtonGroup marginTop={8} justifyContent="center">
      <Button
        type="submit"
        colorScheme="purple"
        isDisabled={!code || !!errors.code}
      >
        {isSubmitting ? <Spinner /> : "Iniciar sesión"}
      </Button>

      <Button
        onClick={async () => {
          const email = getValues("email")
          setGettingCode(true)
          axios
            .post(
              `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/login/${email}/code`
            )
            .then(({ data }) => {
              setGettingCode(false)
              toast({
                description: data.message,
                status: "success",
                icon: <CheckIcon />,
                position: "top",
              })
            })
            .catch((error) => {
              setGettingCode(false)
              console.log({ error })
            })
        }}
        isDisabled={!email || !!errors.email}
      >
        {gettingCode ? <Spinner /> : "Quiero un código"}
      </Button>
    </ButtonGroup>
  )
}

export default LoginButtons

import { Avatar, Button, Flex } from "@chakra-ui/react"
import { useRouter } from "next/router"
import useAuth from "hooks/useAuth"

const AppHeader = () => {
  const { user, setUser } = useAuth()

  const router = useRouter()
  return (
    <Flex justifyContent="space-between" alignItems="center" mb={8}>
      <Avatar src="/logo.png" />
      {!user && (
        <Button
          colorScheme="blue"
          mb={2}
          alignSelf="end"
          onClick={() => {
            router.push("/login")
          }}
        >
          Iniciar sesión
        </Button>
      )}
      {!!user && (
        <Flex gap={2}>
          <Button
            size="sm"
            colorScheme="red"
            mb={2}
            alignSelf="end"
            onClick={() => {
              localStorage.removeItem("user")
              setUser(null)
              document.cookie = "jwt=;expires=Thu, 01 Jan 1970 00:00:01 GMT;"
              router.push("/login")
            }}
          >
            Cerrar sesión
          </Button>
        </Flex>
      )}
    </Flex>
  )
}

export default AppHeader

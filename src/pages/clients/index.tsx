import {
  Button,
  ButtonGroup,
  Card,
  Container,
  Heading,
  Spinner,
} from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import ClientsList from "components/entities/clients/ClientsList"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { env } from "~/env.mjs"

const Clients: NextPage = () => {
  const {
    data: clients,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const res = await axios.get(
        `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/clients`,
        { withCredentials: true }
      )
      return res.data.data
    },
  })

  const router = useRouter()
  console.log({ isLoading, isFetching })

  return (
    <Container mt={8} bg={"#eee"}>
      <Card p={4}>
        <Heading>Clientes</Heading>
        {isLoading ? <Spinner /> : <ClientsList clients={clients} />}
        <ButtonGroup>
          <Button
            mt={6}
            colorScheme="blue"
            onClick={() => {
              router.push("/clients/new")
            }}
          >
            Nuevo cliente
          </Button>
          <Button
            mt={6}
            colorScheme="gray"
            onClick={() => {
              router.push("/")
            }}
          >
            Volver
          </Button>
        </ButtonGroup>
      </Card>
    </Container>
  )
}

export default Clients

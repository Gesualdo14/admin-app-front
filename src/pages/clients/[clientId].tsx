import { Card, Container, Heading } from "@chakra-ui/react"
import { NextPage } from "next"
import ClientForm from "components/entities/clients/ClientForm"
import { useRouter } from "next/router"

const EditClient: NextPage = () => {
  const router = useRouter()
  console.log({ router })
  return (
    <Container mt={8}>
      <Card padding={4}>
        <Heading textAlign="center" mb={6}>
          Editando cliente
        </Heading>
        <ClientForm clientId={router.query.clientId as string} />
      </Card>
    </Container>
  )
}

export default EditClient

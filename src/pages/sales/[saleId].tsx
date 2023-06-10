import { Card, Container, Heading } from "@chakra-ui/react"
import { NextPage } from "next"
import { useRouter } from "next/router"
import SaleForm from "components/entities/sales/SaleForm"

const EditClient: NextPage = () => {
  const router = useRouter()
  return (
    <Container mt={8}>
      <Card padding={4}>
        <Heading textAlign="center" mb={6}>
          Editando venta
        </Heading>
        <SaleForm saleId={router.query.saleId as string} />
      </Card>
    </Container>
  )
}

export default EditClient

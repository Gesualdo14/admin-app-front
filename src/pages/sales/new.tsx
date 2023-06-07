import { Card, Container, Heading } from "@chakra-ui/react"
import { NextPage } from "next"
import SaleForm from "components/entities/sales/SaleForm"

const NewClient: NextPage = () => {
  return (
    <Container mt={8}>
      <Card padding={4}>
        <Heading textAlign="center" mb={6}>
          Nueva venta
        </Heading>
        <SaleForm />
      </Card>
    </Container>
  )
}

export default NewClient

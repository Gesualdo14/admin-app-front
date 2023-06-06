import {
  Button,
  Card,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
} from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { NextPage } from "next"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { DevTool } from "@hookform/devtools"
import axios from "axios"
import { env } from "~/env.mjs"
import { useRouter } from "next/router"
import ClientForm from "components/entities/clients/ClientForm"

const NewClient: NextPage = () => {
  return (
    <Container mt={8}>
      <Card padding={4}>
        <Heading textAlign="center" mb={6}>
          Nuevo cliente
        </Heading>
        <ClientForm />
      </Card>
    </Container>
  )
}

export default NewClient

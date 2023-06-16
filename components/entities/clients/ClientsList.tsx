import { Card, Flex, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { ClientListProps } from "schemas/ClientSchema"

const ClientsList = ({ clients }: ClientListProps) => {
  const router = useRouter()
  return (
    <>
      <Flex
        flexDirection="column"
        p={1}
        gap={2}
        my={4}
        maxHeight="40vh"
        overflowY="scroll"
      >
        {clients
          .sort((a, b) => (b.sales?.amount || 0) - (a.sales?.amount || 0))
          .map((c) => (
            <Card
              key={c._id}
              py={2}
              px={4}
              cursor="pointer"
              _hover={{
                backgroundColor: "gray.200",
                color: "#222",
                transition:
                  "0.2s background-color ease-out, 0.2s color ease-out",
              }}
              onClick={() => router.push(`/clients/${c._id}`)}
              flexDir="row"
              justifyContent="space-between"
            >
              <Text>{c.firstname}</Text>
              <Text color="green">$ {c.sales?.amount?.toFixed(2) || 0}</Text>
            </Card>
          ))}
      </Flex>
      <style jsx>
        {`
          .chakra-card:hover {
            background-color: red !important;
          }
        `}
      </style>
    </>
  )
}

export default ClientsList

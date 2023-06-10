import { Card, Flex, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"

interface SaleFromDB {
  _id: string
  total_amount: number
  client: string
}

interface Props {
  sales: SaleFromDB[]
}

const SalesList = ({ sales }: Props) => {
  const router = useRouter()
  return (
    <>
      <Flex flexDirection="column" gap={2} mt={2}>
        {sales
          .sort((a, b) => (b?.total_amount || 0) - (a?.total_amount || 0))
          .map((s) => (
            <Card
              key={s._id}
              py={2}
              px={4}
              cursor="pointer"
              _hover={{
                backgroundColor: "gray.200",
                color: "#222",
                transition:
                  "0.2s background-color ease-out, 0.2s color ease-out",
              }}
              onClick={() => router.push(`/sales/${s._id}`)}
              flexDir="row"
              justifyContent="space-between"
            >
              <Text>{s.client}</Text>
              <Text>$ {s.total_amount?.toFixed(2) || 0}</Text>
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

export default SalesList

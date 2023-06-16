import { Button, Spinner, TabPanel } from "@chakra-ui/react"
import SalesList from "./SalesList"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { env } from "~/env.mjs"

const SalesPanel = () => {
  const { data: sales, isLoading } = useQuery({
    queryKey: ["sales"],
    queryFn: async () => {
      const res = await axios.get(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/sales`, {
        withCredentials: true,
      })
      return res.data.data
    },
  })

  if (isLoading) return <Spinner />

  return (
    <TabPanel p={0}>
      <SalesList sales={sales} />
      <Button colorScheme="blue" onClick={() => {}}>
        Nueva venta
      </Button>
    </TabPanel>
  )
}

export default SalesPanel

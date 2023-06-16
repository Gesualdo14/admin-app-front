import { Button, Spinner, TabPanel } from "@chakra-ui/react"
import ClientsList from "./ClientsList"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { env } from "~/env.mjs"
import MyModal from "components/ui/modals/MyModal"
import ClientForm from "./ClientForm"

const ClientsPanel = () => {
  const { data: clients, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const res = await axios.get(
        `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/clients`,
        { withCredentials: true }
      )
      return res.data.data
    },
  })

  if (isLoading) return <Spinner />

  return (
    <TabPanel p={0}>
      <ClientsList clients={clients} />
      <MyModal title="Nuevo cliente">
        <ClientForm />
      </MyModal>
    </TabPanel>
  )
}

export default ClientsPanel

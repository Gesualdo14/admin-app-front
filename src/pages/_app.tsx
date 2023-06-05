import { type AppType } from "next/dist/shared/lib/utils"
import "~/styles/globals.css"
import { ChakraProvider } from "@chakra-ui/react"

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp

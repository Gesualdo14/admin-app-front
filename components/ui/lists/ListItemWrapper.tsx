import { Card } from "@chakra-ui/react"
import { ReactNode } from "react"

interface Props {
  onClick: () => void
  selected: boolean | undefined
  children: ReactNode
}

const ListItemWrapper = ({ onClick, selected, children }: Props) => {
  return (
    <Card
      py={2}
      px={4}
      cursor="pointer"
      bg={selected ? "gray.100" : "white"}
      color="black"
      _hover={
        selected
          ? {}
          : {
              backgroundColor: "gray.100",
              color: "#222",
            }
      }
      onClick={onClick}
      flexDir="row"
      alignItems="center"
      justifyContent="space-between"
    >
      {children}
    </Card>
  )
}

export default ListItemWrapper

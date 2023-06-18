import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  ThemingProps,
} from "@chakra-ui/react"
import { ThemeColorDescriptor } from "next/dist/lib/metadata/types/metadata-types"
import { ReactNode } from "react"
import { Sizes } from "schemas/UiSchemas"

interface Props {
  title: string
  buttonText?: string
  disableButton?: boolean
  size?: Sizes
  children: ReactNode
  colorScheme?: string
  mr?: number
}

const MyModal = ({
  title,
  children,
  buttonText,
  disableButton,
  size = "md",
  colorScheme = "blue",
  mr = 0,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button
        size={size}
        onClick={onOpen}
        colorScheme={colorScheme}
        mr={mr}
        isDisabled={disableButton}
      >
        {buttonText || title}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default MyModal

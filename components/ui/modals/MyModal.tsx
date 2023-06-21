import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react"
import { ReactElement, Children, cloneElement } from "react"
import { Sizes } from "schemas/UiSchemas"

interface Props {
  title: string
  buttonText?: string
  disableButton?: boolean
  size?: Sizes
  children: ReactElement
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

  const renderChildren = () => {
    return Children.map(children, (child) => {
      return cloneElement(child as ReactElement, {
        onClose: onClose,
      })
    })
  }
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
          <ModalBody>{renderChildren()}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default MyModal

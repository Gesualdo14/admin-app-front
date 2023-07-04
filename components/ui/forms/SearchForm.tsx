import { CloseIcon } from "@chakra-ui/icons"
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react"
import { useState } from "react"

interface Props {
  setSearchText: (value: string) => void
  placeholder?: string
}

const SearchForm = ({ setSearchText, placeholder = "Buscar..." }: Props) => {
  const [value, setValue] = useState("")
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        setSearchText(value)
      }}
    >
      <Flex mt={5} gap={3} pl={1}>
        <InputGroup>
          <Input
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              !e.target.value && setSearchText("")
              setValue(e.target.value)
            }}
          />
          {value && (
            <InputRightElement
              onClick={() => {
                setValue("")
                setSearchText("")
              }}
              cursor="pointer"
              _hover={{ color: "red.600" }}
            >
              <CloseIcon fontSize="sm" />
            </InputRightElement>
          )}
        </InputGroup>
        <Button type="submit" isDisabled={!value}>
          Buscar
        </Button>
      </Flex>
    </form>
  )
}

export default SearchForm

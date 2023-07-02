import { SearchIcon } from "@chakra-ui/icons"
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
} from "@chakra-ui/react"
import { ReactNode } from "react"
import { useFormContext } from "react-hook-form"
import { MyInputProps } from "schemas/UiSchemas"

function MyInput<T>({
  fieldName,
  label,
  flex = 4,
  showLabel = true,
  valueAsNumber = false,
  valueAsDate = false,
  type = "text",
  placeholder,
  mb = 5,
  size,
  searchFn = false,
  triggerUpdate = false,
}: MyInputProps<T>) {
  const {
    getValues,
    setValue,
    formState: { errors },
    register,
  } = useFormContext()

  const handleSearch = () => {
    const fieldValue = getValues(fieldName as string)
    if (typeof searchFn === "function") {
      searchFn(fieldValue)
    }
  }

  const registerOptions = valueAsNumber ? { valueAsNumber } : { valueAsDate }
  const FinalInput = (
    <Input
      size={size}
      type={type}
      placeholder={placeholder || label}
      {...register(fieldName as string, registerOptions)}
      onChange={(e) => {
        register(fieldName as string, registerOptions).onChange(e)
        triggerUpdate && setValue("trigger_update", Math.random())
      }}
    />
  )

  if (type === "hidden") return FinalInput

  return (
    <FormControl mb={mb} isInvalid={!!errors[fieldName as string]} flex={flex}>
      {!!showLabel && <FormLabel>{label}</FormLabel>}
      <Flex gap={2}>
        {searchFn && (
          <IconButton
            aria-label="Search database"
            icon={<SearchIcon />}
            onClick={handleSearch}
          />
        )}
        {FinalInput}
      </Flex>
      <FormErrorMessage>
        {errors[fieldName]?.message as ReactNode}
      </FormErrorMessage>
    </FormControl>
  )
}

export default MyInput

import { DeleteIcon } from "@chakra-ui/icons"
import React from "react"
import { useFieldArray, useFormContext } from "react-hook-form"

interface Props<T> {
  fieldName: keyof T
  index: number
}

function MyDeleteIcon<T>({ fieldName, index }: Props<T>) {
  const { control } = useFormContext()
  const { remove } = useFieldArray({ control, name: fieldName as string })

  return (
    <DeleteIcon
      mb={2}
      color={index > 0 ? "red.500" : "white"}
      _hover={{ color: index > 0 ? "red.700" : "white", cursor: "pointer" }}
      onClick={() => remove(index)}
    />
  )
}

export default MyDeleteIcon

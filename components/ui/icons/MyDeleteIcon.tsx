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
      color={"red.500"}
      _hover={{ color: "red.700", cursor: "pointer" }}
      onClick={() => remove(index)}
    />
  )
}

export default MyDeleteIcon

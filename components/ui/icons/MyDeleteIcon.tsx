import { DeleteIcon } from "@chakra-ui/icons"
import { useFieldArray, useFormContext } from "react-hook-form"

interface Props<T> {
  fieldName: keyof T
  index: number
}

function MyDeleteIcon<T>({ fieldName, index }: Props<T>) {
  const { control, setValue } = useFormContext()
  const { remove } = useFieldArray({
    control,
    name: fieldName as string,
  })

  return (
    <DeleteIcon
      color={"red.500"}
      _hover={{ color: "red.700", cursor: "pointer" }}
      onClick={() => {
        setValue("trigger_update", Math.random())
        remove(index)
      }}
    />
  )
}

export default MyDeleteIcon

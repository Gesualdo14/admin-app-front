import { FormControl, FormLabel, Select } from "@chakra-ui/react"
import { useFormContext } from "react-hook-form"

interface Props<T> {
  fieldName: keyof T
  label: string
  flex?: number
  options: readonly string[]
}

function MySelect<T>({ label, fieldName, flex = 3, options }: Props<T>) {
  const {
    formState: { errors },
    register,
  } = useFormContext()

  return (
    <FormControl flex={flex}>
      <FormLabel>{label}</FormLabel>
      <Select placeholder="Seleccionar" {...register(fieldName as string)}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </Select>
    </FormControl>
  )
}

export default MySelect

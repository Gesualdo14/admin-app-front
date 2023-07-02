import { FormControl, FormLabel, Select } from "@chakra-ui/react"
import { useFormContext } from "react-hook-form"

interface Props<T> {
  fieldName: keyof T
  label: string
  flex?: number
  options: readonly string[]
  show?: boolean
  showIf?: [keyof T, string]
}

function MySelect<T>({
  label,
  fieldName,
  flex = 3,
  options,
  showIf,
}: Props<T>) {
  const { register, watch } = useFormContext()

  let show = true
  if (showIf) {
    show = watch(showIf[0] as string) === showIf[1]
  }

  if (!show) return <></>

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

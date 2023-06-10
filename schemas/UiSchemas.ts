export interface MyInputProps<T> {
  fieldName: keyof T
  label: string
  valueAsNumber?: boolean
  valueAsDate?: boolean
  showLabel?: boolean
  type?: string
  flex?: number
  placeholder?: string
  mb?: number
  searchFn?: ((state: any) => void) | boolean
}

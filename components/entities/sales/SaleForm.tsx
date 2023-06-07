import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Select,
  Spinner,
} from "@chakra-ui/react"
import { DeleteIcon, SearchIcon } from "@chakra-ui/icons"
import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useRouter } from "next/router"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { env } from "~/env.mjs"
import DatePicker from "react-datepicker"
import { useState } from "react"
import "react-datepicker/dist/react-datepicker.css"

const PAYMENT_METHOD_TYPES = [
  "Sin utilización Sist. Financiero",
  "Compensación de deudas",
  "Tarjeta de débito",
  "Tarjeta de crédito",
  "Dinero electrónico",
  "Otros con utilización del sistema financiero",
  "Endoso de títulos",
] as const

const TIME_UNITS = z.enum(["Días", "Meses", "Años"])

const saleProductSchema = z.object({
  code: z.string(),
  name: z.string().optional(),
  qty: z.number(),
  unit_price: z.number().optional(),
  discount: z.number().optional(),
  total: z.number(),
})
const salePaymentMethodSchema = z.object({
  method: z.enum(PAYMENT_METHOD_TYPES),
  amount: z.number(),
  time_unit: TIME_UNITS,
  time_value: z.number(),
})

const saleSchema = z.object({
  operation_date: z.date(),
  total_amount: z.number().nonnegative(),
  client: z.string(),
  client_document: z.string(),
  products: z.array(saleProductSchema),
  payment_methods: z.array(salePaymentMethodSchema),
})

export type Sale = z.infer<typeof saleSchema>
type PaymentMethod = z.infer<typeof salePaymentMethodSchema>
type Product = z.infer<typeof saleProductSchema>

interface Props {
  saleId?: string
}

const defaultPM: PaymentMethod = {
  method: "Sin utilización Sist. Financiero",
  amount: 0,
  time_unit: "Meses",
  time_value: 0,
}
const defaultProduct: Product = {
  code: "",
  name: "",
  qty: 0,
  total: 0,
}

const SaleForm = ({ saleId }: Props) => {
  const [startDate, setStartDate] = useState(new Date())
  const {
    register,
    control,
    reset,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<Sale>({
    resolver: zodResolver(saleSchema),
    defaultValues: async () => {
      if (!saleId)
        return {
          payment_methods: [defaultPM],
          products: [defaultProduct],
        }

      const { data } = await axios.get(
        `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/clients/${saleId}`,
        { withCredentials: true }
      )

      return data.data
    },
  })

  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "payment_methods", // unique name for your Field Array
  })
  const {
    fields: products,
    append: addProduct,
    remove: removeProduct,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "products", // unique name for your Field Array
  })

  const router = useRouter()

  const onSubmit = async (data: Sale) => {
    const PARAMS = !!saleId ? `/${saleId}` : ""
    const res = await axios(
      `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/sales${PARAMS}`,
      {
        method: !!saleId ? "PUT" : "POST",
        data,
        withCredentials: true,
      }
    )
    reset()
    console.log({ res })
    router.push("/")
  }

  if (isLoading)
    return (
      <Flex height={20} alignItems="center" justifyContent="center">
        <Spinner alignSelf="center" colorScheme="purple" color="purple" />
      </Flex>
    )

  console.log({ products })

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb={5} isInvalid={!!errors.client_document}>
          <FormLabel>Documento del cliente</FormLabel>
          <Input
            type="text"
            placeholder="Nombre"
            {...register("client_document")}
          />
          <FormErrorMessage>{errors.client_document?.message}</FormErrorMessage>
        </FormControl>
        <FormControl mb={5} isInvalid={!!errors.operation_date}>
          <FormLabel>Fecha de la operación</FormLabel>
          <DatePicker
            selected={startDate}
            ref={register("operation_date").ref}
            onChange={(date: Date) => setValue("operation_date", date)}
          />
          <FormErrorMessage>{errors.operation_date?.message}</FormErrorMessage>
        </FormControl>
        <Flex flexDir="column" mb={4}>
          {products.map((field, index) => (
            <Flex gap={3} alignItems="flex-end" mb={5}>
              <IconButton
                aria-label="Search database"
                icon={<SearchIcon />}
                onClick={async () => {
                  const code = getValues(`products.${index}.code`)
                  console.log({ code })
                  if (!code) return
                  const { data } = await axios.get(
                    `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/${code}`,
                    { withCredentials: true }
                  )
                  const product: Product = data.data
                  if (!!product) {
                    setValue(`products.${index}`, {
                      code: code,
                      name: product.name,
                      qty: 0,
                      total: 0,
                    })
                  } else {
                    console.log("No existe un producto con ese código")
                  }
                }}
              />
              <FormControl flex={2}>
                <FormLabel>Código</FormLabel>
                <Input
                  type="text"
                  placeholder="Código"
                  {...register(`products.${index}.code`)}
                />
              </FormControl>
              <FormControl flex={5}>
                <FormLabel>Denominación</FormLabel>

                <Input
                  type="text"
                  placeholder="Denominación"
                  {...register(`products.${index}.name`)}
                  disabled
                />
              </FormControl>
              <FormControl flex={1}>
                <Flex alignItems="center" justifyContent="space-between">
                  <FormLabel>Cantidad</FormLabel>
                  {index > 0 && (
                    <DeleteIcon
                      mb={2}
                      color="red.500"
                      _hover={{ color: "red.700", cursor: "pointer" }}
                      onClick={() => removeProduct(index)}
                    />
                  )}
                </Flex>
                <Input type="number" {...register(`products.${index}.qty`)} />
              </FormControl>
            </Flex>
          ))}
          <Button onClick={() => addProduct(defaultProduct)}>
            Nuevo producto
          </Button>
        </Flex>
        <Flex flexDir="column" mb={4}>
          {fields.map((field, index) => (
            <Flex gap={3} alignItems="flex-end" mb={5}>
              <FormControl flex={7}>
                <FormLabel>Método</FormLabel>
                <Select
                  placeholder="Seleccionar"
                  {...register(`payment_methods.${index}.method`)}
                >
                  {PAYMENT_METHOD_TYPES.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl flex={3} isInvalid={!!errors?.payment_methods}>
                <FormLabel>Valor</FormLabel>
                <Input
                  type="text"
                  placeholder="Valor"
                  {...register(`payment_methods.${index}.amount`)}
                />
              </FormControl>
              <FormControl flex={2} isInvalid={!!errors?.payment_methods}>
                <FormLabel>Plazo</FormLabel>

                <Input
                  type="number"
                  placeholder="Plazo"
                  {...register(`payment_methods.${index}.time_value`)}
                />
              </FormControl>
              <FormControl flex={4}>
                <Flex alignItems="center" justifyContent="space-between">
                  <FormLabel>Período</FormLabel>
                  {index > 0 && (
                    <DeleteIcon
                      mb={2}
                      color="red.500"
                      _hover={{ color: "red.700", cursor: "pointer" }}
                      onClick={() => remove(index)}
                    />
                  )}
                </Flex>
                <Select
                  placeholder="Seleccionar"
                  {...register(`payment_methods.${index}.time_unit`)}
                >
                  {Object.keys(TIME_UNITS.Enum).map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Flex>
          ))}
          <Button onClick={() => append(defaultPM)}>Nuevo método</Button>
        </Flex>
        <ButtonGroup>
          <Button colorScheme="purple" type="submit">
            {!!saleId ? "Guardar cambios" : "Crear"}
          </Button>
          <Button colorScheme="gray" onClick={() => router.back()}>
            Volver
          </Button>
        </ButtonGroup>
      </form>
      <DevTool control={control} />
    </>
  )
}

export default SaleForm

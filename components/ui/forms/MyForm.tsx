import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { AnyZodObject, z } from "zod"
import { DefaultValues, FieldValues } from "react-hook-form/dist/types"
import { FormProvider } from "react-hook-form"
import { ReactNode } from "react"
import { DevTool } from "@hookform/devtools"
import { Flex, Spinner } from "@chakra-ui/react"

interface Props {
  zodSchema: AnyZodObject
  onSubmit: (data: any, reset: any) => void
  onError: (data: FieldValues) => void
  children: ReactNode
  defaultValues?: DefaultValues<FieldValues>
}

const MyForm = ({
  defaultValues = {},
  zodSchema,
  onSubmit,
  onError,
  children,
}: Props) => {
  console.log({ defaultValues })
  type EntityType = z.infer<typeof zodSchema>
  const methods = useForm<EntityType>({
    resolver: zodResolver(zodSchema),
    defaultValues,
  })

  if (methods.formState.isLoading)
    return (
      <Flex height={20} alignItems="center" justifyContent="center">
        <Spinner alignSelf="center" colorScheme="purple" color="purple" />
      </Flex>
    )
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(
          (data) => onSubmit(data, methods.reset),
          onError
        )}
      >
        {children}
      </form>
      <DevTool control={methods.control} />
    </FormProvider>
  )
}

export default MyForm

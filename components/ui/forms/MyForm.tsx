import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { DefaultValues, FieldValues } from "react-hook-form/dist/types"
import { FormProvider } from "react-hook-form"
import { Children, ReactNode, cloneElement } from "react"
import { DevTool } from "@hookform/devtools"
import { Flex, Spinner } from "@chakra-ui/react"

interface Props<T> {
  zodSchema: z.Schema
  onSubmit: (data: T, reset: any) => Promise<void> | void
  onError: (data: FieldValues) => void
  children: ReactNode
  defaultValues?: DefaultValues<FieldValues>
}

const MyForm = <T,>({
  defaultValues,
  zodSchema,
  onSubmit,
  onError,
  children,
}: Props<T>) => {
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

  const renderChildren = () => {
    return Children.map(children, (child: any) => {
      let props = {}

      if ("name" in child?.type) {
        props = {
          getValues: methods.getValues,
          onSubmit,
          reset: methods.reset,
        }
      }
      return cloneElement(child, props)
    })
  }
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(
          async (data) => {
            await onSubmit(data, methods.reset) // Si o si el await para el loading
          },
          (errors) => {
            console.log({ data: methods.getValues() })
            onError(errors)
          }
        )}
      >
        {renderChildren()}
      </form>
      <DevTool control={methods.control} />
    </FormProvider>
  )
}

export default MyForm

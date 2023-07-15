import { Flex, Spinner, Text } from "@chakra-ui/react"
import { ReactNode } from "react"
import useFetch from "hooks/useFetch"
import paramsGenerator from "helpers/paramsGenerator"

interface Props<T> {
  path: string
  urlParams: { [key: string]: boolean | number | string | null }
  sortFunction?: (a: T, b: T) => number
  filterFunction?: (item: T) => boolean
  children: (props: { refetch: () => void; items: T[] }) => ReactNode
}

const List = <T,>({
  path,
  urlParams,
  sortFunction,
  filterFunction,
  children,
}: Props<T>) => {
  const PARAMS = paramsGenerator(urlParams)
  const { data, isLoading, refetch } = useFetch<T>({
    path,
    params: PARAMS,
  })

  let finalData = data || []
  if (typeof filterFunction === "function") {
    finalData = data?.filter(filterFunction) || []
  }

  if (typeof sortFunction === "function") {
    finalData = data?.sort(sortFunction) || []
  }

  const noData = !finalData || finalData.length === 0

  if (noData && !isLoading) {
    return (
      <Text mt={5} mb={25} textAlign="center">
        No se encontraron registros en la base de datos
      </Text>
    )
  }

  return (
    <Flex flexDir="column">
      {isLoading && <Spinner alignSelf="center" mt={20} mb={20} />}

      {finalData && (
        <Flex flexDirection="column" p={1} gap={2}>
          {children({ refetch, items: finalData })}
        </Flex>
      )}
    </Flex>
  )
}

export default List

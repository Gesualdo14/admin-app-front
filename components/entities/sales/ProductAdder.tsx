import { Flex } from "@chakra-ui/react"
import axios from "axios"
import MyDeleteIcon from "components/ui/icons/MyDeleteIcon"
import MyInput from "components/ui/inputs/MyInput"
import React, { useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { Product, Sale } from "schemas/SaleSchema"
import { env } from "~/env.mjs"

interface Props {
  fieldName: keyof Sale
}

function ProductAdder({ fieldName }: Props) {
  const { setValue, watch } = useFormContext()
  const products = watch(fieldName)

  useEffect(() => {
    if (products?.length > 0) {
      let amount = products.reduce(
        (prev: any, curr: any) => prev + curr.qty * curr.unit_price,
        0
      )
      //   setTotalAmount(amount)
      setValue(`payment_methods.0.amount`, amount)
    }
  }, [products])

  return (
    <Flex flexDir="column" alignItems="flex-end">
      {products.map((product: Product, index: number) => (
        <Flex gap={3} alignItems="flex-end">
          <MyInput
            fieldName={`products.${index}.code`}
            label="Código"
            showLabel={index === 0}
            searchFn={async (code) => {
              console.log({ code })
              if (!code) return
              const { data } = await axios.get(
                `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/${code}`,
                { withCredentials: true }
              )
              const product: Product = data.data
              const {
                supplier_cost,
                micro,
                iva,
                profit_margin,
                salvament_margin,
              } = product

              const baseCost = micro + supplier_cost
              const minimumCost = baseCost / (1 - salvament_margin)
              const finalPrice = +(minimumCost / (1 - profit_margin)).toFixed(3)

              if (!!product) {
                setValue(`products.${index}`, {
                  code: code,
                  name: product.name,
                  qty: 1,
                  unit_price: finalPrice,
                })
              } else {
                console.log("No existe un producto con ese código")
              }
            }}
          />
          <MyInput
            fieldName={`products.${index}.name`}
            label="Denominación"
            showLabel={index === 0}
          />
          <MyInput
            fieldName={`products.${index}.qty`}
            label="Cantidad"
            showLabel={index === 0}
            valueAsNumber
          />
          <MyDeleteIcon<Sale> fieldName="products" index={index} />
        </Flex>
      ))}
    </Flex>
  )
}

export default ProductAdder

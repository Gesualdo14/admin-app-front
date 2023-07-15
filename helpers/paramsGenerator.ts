interface Props {
  [key: string]: any
}

const paramsGenerator = (params: Props) => {
  let keys = Object.keys(params)
  if (keys.length === 0) return ""

  let finalParams = "?"

  for (let index = 0; index < keys.length; index++) {
    const key = keys[index] as string
    const value = params[key]
    const isLastOne = index === keys.length - 1

    if (!!value) {
      finalParams += `${key}=${value}${!isLastOne ? "&" : ""}`
    }
  }

  return finalParams
}

export default paramsGenerator

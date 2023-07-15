import { UseToastOptions } from "@chakra-ui/react"

interface Props {
  e: MouseEvent | any
  text: string
  toast: (options: UseToastOptions) => void
}

export const copyToClipboard = ({ e, text, toast }: Props) => {
  e.stopPropagation()
  navigator.clipboard.writeText(text)
  toast({
    position: "top",
    title: `Valor copiado ${text}`,
    status: "success",
    duration: 1500,
  })
}

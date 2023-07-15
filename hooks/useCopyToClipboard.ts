import { UseToastOptions } from "@chakra-ui/react"

interface Props {
  text: string
  title: string
  toast: (options: UseToastOptions) => void
}

export const useCopyToClipboard = ({ text, title, toast }: Props) => {
  const copyToClipboard = (e: MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(text)
    toast({
      position: "top",
      title,
      status: "success",
      duration: 1500,
    })
  }

  return copyToClipboard
}

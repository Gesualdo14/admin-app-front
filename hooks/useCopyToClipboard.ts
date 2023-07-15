import { useToast } from "@chakra-ui/react"

interface Props {
  text: string
  title: string
}

export const useCopyToClipboard = ({ text, title }: Props) => {
  const toast = useToast()

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

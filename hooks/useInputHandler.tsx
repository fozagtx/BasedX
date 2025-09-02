import { useState } from "react"

export function useInputHandler(initialValue: string = "") {
  const [input, setInput] = useState(initialValue)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  const handleValueChange = (value: string) => {
    setInput(value)
  }

  return {
    input,
    isLoading,
    handleSubmit,
    handleValueChange,
  }
}

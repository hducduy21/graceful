import { useState } from 'react'

function useCollapse(defaultValue = true): [boolean, () => void] {
  const [isVisible, setIsVisible] = useState<boolean>(defaultValue)

  const controlVisible = () => {
    setIsVisible(!isVisible)
  }

  return [isVisible, controlVisible]
}

export default useCollapse
import {useEffect, useState} from 'react'

export const useIsTheFirstRender = () => {
  const [isTheFirstRender, setIsTheFirstRender] = useState(true)

  useEffect(() => {
    setIsTheFirstRender(false)
  }, [])

  return isTheFirstRender
}

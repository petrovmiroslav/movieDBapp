import {useEffect, useRef} from 'react'

const useIsMounted = () => {
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  return {isMountedRef}
}
export default useIsMounted

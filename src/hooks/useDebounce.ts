import {useEffect, useMemo} from 'react'
import {FUNC} from '../utils/func'

export const DEFAULT_DEBOUNCE_DELAY = 800

export const useDebounce: typeof FUNC.debounce = (
  func,
  wait = DEFAULT_DEBOUNCE_DELAY,
  options,
) => {
  const debouncedFunc = useMemo(
    () => FUNC.debounce(func, wait, options),
    [func, wait, options],
  )

  useEffect(
    () => () => {
      /** cleanup */
      debouncedFunc.cancel()
    },
    [debouncedFunc],
  )

  return debouncedFunc
}

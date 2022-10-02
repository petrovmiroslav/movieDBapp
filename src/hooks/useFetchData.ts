import useIsMounted from './useIsMounted'
import {useCallback, useEffect, useRef, useState} from 'react'
import {Nullable} from '../utils/types'

export type UseFetchDataListParams<Data> = {
  defaultDataListValue?: Data[]
  fetchDataListFunc: (page: number) => Promise<Nullable<Data[]>>
}
export const useFetchDataList = <Data>({
  defaultDataListValue,
  fetchDataListFunc,
}: UseFetchDataListParams<Data>) => {
  const {isMountedRef} = useIsMounted()

  const [isPending, setIsPending] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(true)
  const [loadMoreCount, setLoadMoreCount] = useState(0)

  const defaultDataListValueFallback = useRef([]).current
  const defaultDataList = defaultDataListValue ?? defaultDataListValueFallback
  const [dataList, setDataList] = useState(defaultDataList)

  const dataPageNumberRef = useRef(0)

  const loadMoreData = useCallback(() => {
    if (isPending) return
    setLoadMoreCount(num => num + 1)
  }, [isPending])

  const onRefresh = useCallback(() => {
    dataPageNumberRef.current = 0
    setIsRefreshing(true)
    setLoadMoreCount(num => (num === 0 ? num + 1 : 0))
  }, [])

  useEffect(() => {
    dataPageNumberRef.current = 0
  }, [fetchDataListFunc])

  useEffect(() => {
    let isCanceled = false
    const fetchFunc = async () => {
      const dataPageNumber = dataPageNumberRef.current
      setIsPending(true)
      !dataPageNumber && setDataList(defaultDataList)

      const res = await fetchDataListFunc(dataPageNumber + 1)

      if (!isMountedRef.current || isCanceled) return

      const newDataList = Array.isArray(res) ? res : defaultDataList

      if (newDataList.length) {
        dataPageNumberRef.current++
      }

      setIsPending(false)
      setIsRefreshing(false)
      setDataList(prevState => {
        if (!dataPageNumber) return newDataList
        if (newDataList.length) return prevState.concat(newDataList)
        return prevState
      })
    }

    fetchFunc().then()
    return () => {
      isCanceled = true
    }
  }, [defaultDataList, fetchDataListFunc, isMountedRef, loadMoreCount])

  return {dataList, isPending, isRefreshing, loadMoreData, onRefresh}
}

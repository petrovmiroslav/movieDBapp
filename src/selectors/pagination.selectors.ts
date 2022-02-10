import {EntitiesNamesPlural} from '../store/entities/entities.types'
import {State} from '../store/store'
import {PaginationQueryKey} from '../store/pagination/pagination.types'
import createCachedSelector from 're-reselect'
import {defaultCachedSelectorKeySelector} from '../utils/selectors'
import {getPrimitiveValuesOnly} from '../utils/types'

/** Возвращает PaginationQueryKeyData по имени entityName и paginationQueryKey*/
export const paginationQueryKeyDataSelector = (() => {
  const selector = createCachedSelector(
    [
      (
        state: State,
        entityName: keyof EntitiesNamesPlural,
        paginationQueryKey: PaginationQueryKey,
      ) => {
        // console.log('paginationQueryKeyDataSelector IN')
        return state.pagination[entityName]?.[paginationQueryKey]
      },
    ],
    paginationQueryKeyData => {
      // console.log('paginationQueryKeyDataSelector OUT')
      return paginationQueryKeyData
    },
  )(defaultCachedSelectorKeySelector)

  return (
    state: State,
    entityName: keyof EntitiesNamesPlural,
    paginationQueryKey: PaginationQueryKey,
  ) => selector(state, entityName, paginationQueryKey)
})()

/** Возвращает только примитивные значения PaginationQueryKeyData
 * по имени entityName и paginationQueryKey*/
export const paginationQueryKeyDataPrimitiveValuesSelector = (() => {
  const selector = createCachedSelector(
    [
      paginationQueryKeyDataSelector,
      // () => {
      //   console.log('paginationQueryKeyDataPrimitiveValuesSelector IN')
      // },
    ],
    paginationQueryKeyData => {
      // console.log('paginationQueryKeyDataPrimitiveValuesSelector OUT')
      return (
        paginationQueryKeyData && getPrimitiveValuesOnly(paginationQueryKeyData)
      )
    },
  )(defaultCachedSelectorKeySelector)

  return (
    state: State,
    entityName: keyof EntitiesNamesPlural,
    paginationQueryKey: PaginationQueryKey,
  ) => selector(state, entityName, paginationQueryKey)
})()
export const selectPaginationQueryKeyDataPrimitiveValues =
  (
    entityName: keyof EntitiesNamesPlural,
    paginationQueryKey: PaginationQueryKey,
  ) =>
  (state: State) =>
    paginationQueryKeyDataPrimitiveValuesSelector(
      state,
      entityName,
      paginationQueryKey,
    )

/** Возвращает список загруженных страниц по имени entityName и paginationQueryKey*/
export const loadedPagesListSelector = (() => {
  const selector = createCachedSelector(
    [
      paginationQueryKeyDataSelector,
      // () => {
      //   console.log('loadedPagesListSelector IN')
      // },
    ],
    paginationQueryKeyData => {
      // console.log('loadedPagesListSelector OUT')
      return paginationQueryKeyData?.loadedPages
    },
  )(defaultCachedSelectorKeySelector)

  return (
    state: State,
    entityName: keyof EntitiesNamesPlural,
    paginationQueryKey: PaginationQueryKey,
  ) => selector(state, entityName, paginationQueryKey)
})()

/** Возвращает список загруженных Id по имени entityName и paginationQueryKey*/
export const loadedIdsListSelector = (() => {
  const selector = createCachedSelector(
    [
      paginationQueryKeyDataSelector,
      // () => {
      //   console.log('loadedIdsListSelector IN')
      // },
    ],
    paginationQueryKeyData => {
      // console.log('loadedIdsListSelector OUT')
      if (!paginationQueryKeyData?.ids?.length) return
      return paginationQueryKeyData.ids
    },
  )(defaultCachedSelectorKeySelector)

  return (
    state: State,
    entityName: keyof EntitiesNamesPlural,
    paginationQueryKey: PaginationQueryKey,
  ) => selector(state, entityName, paginationQueryKey)
})()

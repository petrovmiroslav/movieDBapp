import {AnyAction, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {
  PAGINATION_ACTION_TYPES,
  PAGINATION_QUERY_KEY_ROOTS,
  PaginationActionPayload,
  PaginationQueryKey,
  PaginationQueryKeyActionPayloadData,
  PaginationQueryKeyData,
  PaginationQueryKeyParams,
  PaginationQueryKeyState,
  PaginationState,
  PickPaginationActionPayload,
} from './pagination.types'
import {getUniqArray} from '../../utils/array'
import {
  EntitiesIds,
  EntitiesNamesPlural,
  EntitiesNamesSingularByPlural,
} from '../entities/entities.types'
import {ENTITIES_IDS_NAMES} from '../../constants/entities'

export const paginationQueryKeyParamsDictionary: {
  [key in keyof PaginationQueryKeyParams]-?: true
} = {
  ...(Object.fromEntries(
    Object.keys(ENTITIES_IDS_NAMES).map(idName => [idName, true]),
  ) as {[key in keyof typeof ENTITIES_IDS_NAMES]: true}),

  favoritesType: true,
  sort_by: true,
  'vote_average.gte': true,
  'vote_average.lte': true,
  'vote_count.gte': true,
  'vote_count.lte': true,
  with_genres: true,
  without_genres: true,
}

// убирает из queryKeyParams все ключи которые не могут быть
// параметрами PaginationQueryKeyParams
const mapPaginationQueryKeyParams = (
  queryKeyParams: PaginationQueryKeyParams,
): PaginationQueryKeyParams =>
  Object.fromEntries(
    Object.entries(queryKeyParams).filter(
      keyValue =>
        paginationQueryKeyParamsDictionary[
          keyValue[0] as keyof PaginationQueryKeyParams
        ],
    ),
  )

// создает строковый PaginationQueryKey из параметров PaginationQueryKeyParams
export const getPaginationQueryKey = (
  root: PAGINATION_QUERY_KEY_ROOTS,
  queryKeyParams?: PaginationQueryKeyParams,
): PaginationQueryKey => {
  if (!queryKeyParams) return root
  const queryString = Object.keys(mapPaginationQueryKeyParams(queryKeyParams))
    .sort()
    .reduce<string[]>((keyValueStringList, key) => {
      const value = queryKeyParams[key as keyof typeof queryKeyParams]
      if (value === undefined) return keyValueStringList

      const stringValue = Array.isArray(value)
        ? value.sort().join(',')
        : value.toString()
      keyValueStringList.push(`${key}=${stringValue}`)
      return keyValueStringList
    }, [])
    .join('&')

  return queryString.length ? `${root}?${queryString}` : root
}

export const paginationMatcher = (
  action: AnyAction,
): action is PayloadAction<
  PaginationActionPayload<keyof EntitiesNamesPlural>
> => !!action.payload?.pagination

const paginationQueryKeyDataReducer = <
  EntityIdType extends EntitiesIds[keyof EntitiesIds],
>(
  state: PaginationQueryKeyData<EntityIdType>,
  action: PaginationQueryKeyActionPayloadData<EntityIdType>,
) => {
  state.ids = state.ids ?? []
  state.loadedPages = state.loadedPages ?? []

  const actionPagesSortedByPageNumber = action.pages.sort(
    (pageData1, pageData2) => pageData1.page - pageData2.page,
  )
  const actionIds = actionPagesSortedByPageNumber.reduce<EntityIdType[]>(
    (idsList, currentPageData) => {
      currentPageData.ids?.forEach(id => idsList.push(id))
      return idsList
    },
    [],
  )

  const actionLoadedPages = getUniqArray(
    actionPagesSortedByPageNumber.map(pageData => pageData.page),
  )

  const lastPageInNewPagesSorted =
    actionPagesSortedByPageNumber[actionPagesSortedByPageNumber.length - 1]

  state.page =
    lastPageInNewPagesSorted.totalPages !== undefined &&
    lastPageInNewPagesSorted.page > lastPageInNewPagesSorted.totalPages
      ? lastPageInNewPagesSorted.totalPages
      : lastPageInNewPagesSorted.page
  state.totalResults = lastPageInNewPagesSorted.totalResults
  state.totalPages = lastPageInNewPagesSorted.totalPages

  switch (action._actionType) {
    case PAGINATION_ACTION_TYPES.REFRESH:
    case PAGINATION_ACTION_TYPES.RE_FETCH: {
      state.loadedPages = actionLoadedPages.sort((a, b) => a - b)
      state.ids = getUniqArray(actionIds)
      return
    }
    default: {
      actionLoadedPages.forEach(pageNumber =>
        state.loadedPages?.push(pageNumber),
      )
      state.loadedPages = getUniqArray(state.loadedPages).sort((a, b) => a - b)
      actionIds.forEach(id => state.ids && state.ids.push(id))
      state.ids = getUniqArray(state.ids)
    }
  }
}

const entityPaginationReducer = <EntityName extends keyof EntitiesNamesPlural>(
  state: PaginationQueryKeyState<
    EntitiesIds[EntitiesNamesSingularByPlural[EntityName]]
  >,
  paginationQueryKeyActionPayloadDataList: PickPaginationActionPayload<EntityName>[EntityName],
) => {
  paginationQueryKeyActionPayloadDataList.forEach(
    actionQueryKeyActionPayloadData => {
      state[actionQueryKeyActionPayloadData.queryKey] = state[
        actionQueryKeyActionPayloadData.queryKey
      ] ?? {page: 1}

      paginationQueryKeyDataReducer(
        state[
          actionQueryKeyActionPayloadData.queryKey
        ] as PaginationQueryKeyData<
          EntitiesIds[EntitiesNamesSingularByPlural[EntityName]]
        >,
        actionQueryKeyActionPayloadData,
      )
    },
  )
}

export const paginationReducer = <EntityName extends keyof EntitiesNamesPlural>(
  state: PaginationState,
  action: PayloadAction<PaginationActionPayload<EntityName>>,
) => {
  for (const entityName in action.payload.pagination) {
    state[entityName] = state[entityName] ?? {}
    entityPaginationReducer(
      state[entityName] as PaginationQueryKeyState<
        EntitiesIds[EntitiesNamesSingularByPlural[EntityName]]
      >,
      action.payload.pagination[entityName as EntityName],
    )
  }
}

const initialPaginationState: PaginationState = {}

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState: initialPaginationState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(paginationMatcher, paginationReducer)
  },
})

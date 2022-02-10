import {Dispatch, GetState} from '../store/store'
import {ResponseError} from '../api/api'
import {loadedPagesListSelector} from '../selectors/pagination.selectors'
import {EntitiesNamesPlural} from '../store/entities/entities.types'
import {PaginationQueryKey} from '../store/pagination/pagination.types'
import {PaginationApiParams} from '../api/pagination/pagination.types'

export type Re_fetchPagesParams<
  ApiFuncParams extends Pick<PaginationApiParams, 'page'>,
  ApiFuncReturnType,
> = {
  entityName: keyof EntitiesNamesPlural
  paginationQueryKey: PaginationQueryKey
  apiFuncParams: ApiFuncParams
  apiFunc: (params: ApiFuncParams) => ApiFuncReturnType
}
export const re_fetchPages =
  <ApiFuncParams extends Pick<PaginationApiParams, 'page'>, ApiFuncReturnType>({
    entityName,
    paginationQueryKey,
    apiFunc,
    apiFuncParams,
  }: Re_fetchPagesParams<ApiFuncParams, ApiFuncReturnType>) =>
  async (_dispatch: Dispatch, getState: GetState) => {
    try {
      const loadedPages = loadedPagesListSelector(
        getState(),
        entityName,
        paginationQueryKey,
      ) ?? [1]

      return await Promise.all(
        loadedPages.map(pageNumber => {
          apiFuncParams.page = pageNumber
          return apiFunc(apiFuncParams)
        }),
      )
    } catch (e) {
      const responseError = e as ResponseError
      responseError.error = true
      console.error('Error: fetchMovieApi', {responseError})
      return responseError
    }
  }

import {
  discoverMovieApi,
  fetchMovieApi,
  fetchPopularMoviesApi,
  fetchRecommendationsMoviesAPi,
  fetchSimilarMoviesAPi,
  fetchTopRatedMoviesApi,
} from '../api/movies/movies.requests'
import {Dispatch, GetState} from '../store/store'
import {
  fetchDiscoverMovieSuccess,
  fetchMoviesSuccess,
  fetchPopularMoviesSuccess,
  fetchRecommendationsMoviesSuccess,
  fetchSimilarMoviesSuccess,
  fetchTopRatedMoviesSuccess,
} from '../store/entities/movies/movies.slice'
import {
  DiscoverMovieApiParams,
  FetchMovieApiParams,
  FetchPopularMoviesApiParam,
  FetchRecommendationsMoviesAPiParams,
  FetchSimilarMoviesAPiParams,
  FetchTopRatedMoviesApiParam,
} from '../api/movies/movies.types'
import {ResponseError} from '../api/api'
import {re_fetchPages} from './pagination.thunks'
import {getPaginationQueryKey} from '../store/pagination/pagination.slice'
import {
  PAGINATION_ACTION_TYPES,
  PAGINATION_QUERY_KEY_ROOTS,
} from '../store/pagination/pagination.types'
import {re_FetchPayloadMapper} from '../api/pagination/pagination.mappers'

export const fetchMovie =
  (params: FetchMovieApiParams) => async (dispatch: Dispatch) => {
    try {
      const res = await fetchMovieApi(params)

      dispatch(fetchMoviesSuccess(res))
    } catch (e) {
      const responseError = e as ResponseError
      responseError.error = true
      console.error('Error: fetchMovieApi', {responseError})
      return responseError
    }
  }

export const discoverMovie =
  (params: DiscoverMovieApiParams) =>
  async (dispatch: Dispatch, getState: GetState) => {
    try {
      let actionPayload:
        | Parameters<typeof fetchDiscoverMovieSuccess>[0]
        | undefined

      switch (params._actionType) {
        case PAGINATION_ACTION_TYPES.RE_FETCH: {
          const res = await re_fetchPages({
            entityName: 'movies',
            paginationQueryKey: getPaginationQueryKey(
              PAGINATION_QUERY_KEY_ROOTS.DISCOVER_MOVIES,
              params,
            ),
            apiFunc: discoverMovieApi,
            apiFuncParams: params,
          })(dispatch, getState)

          if (!Array.isArray(res)) return res

          actionPayload = re_FetchPayloadMapper(res)
          break
        }
        default: {
          actionPayload = await discoverMovieApi(params)
        }
      }

      actionPayload && dispatch(fetchDiscoverMovieSuccess(actionPayload))
    } catch (e) {
      const responseError = e as ResponseError
      responseError.error = true
      console.error('Error: discoverMovieApi', {responseError})
      return responseError
    }
  }

export const fetchRecommendationsMovies =
  (params: FetchRecommendationsMoviesAPiParams) =>
  async (dispatch: Dispatch, getState: GetState) => {
    try {
      let actionPayload:
        | Parameters<typeof fetchRecommendationsMoviesSuccess>[0]
        | undefined

      switch (params._actionType) {
        case PAGINATION_ACTION_TYPES.RE_FETCH: {
          const res = await re_fetchPages({
            entityName: 'movies',
            paginationQueryKey: getPaginationQueryKey(
              PAGINATION_QUERY_KEY_ROOTS.RECOMMENDATIONS_MOVIES,
              params,
            ),
            apiFunc: fetchRecommendationsMoviesAPi,
            apiFuncParams: params,
          })(dispatch, getState)

          if (!Array.isArray(res)) return res

          actionPayload = re_FetchPayloadMapper(res)
          break
        }
        default: {
          actionPayload = await fetchRecommendationsMoviesAPi(params)
        }
      }

      actionPayload &&
        dispatch(fetchRecommendationsMoviesSuccess(actionPayload))
    } catch (e) {
      const responseError = e as ResponseError
      responseError.error = true
      console.error('Error: recommendationsMoviesAPi', {responseError})
      return responseError
    }
  }

export const fetchSimilarMovies =
  (params: FetchSimilarMoviesAPiParams) =>
  async (dispatch: Dispatch, getState: GetState) => {
    try {
      let actionPayload:
        | Parameters<typeof fetchSimilarMoviesSuccess>[0]
        | undefined

      switch (params._actionType) {
        case PAGINATION_ACTION_TYPES.RE_FETCH: {
          const res = await re_fetchPages({
            entityName: 'movies',
            paginationQueryKey: getPaginationQueryKey(
              PAGINATION_QUERY_KEY_ROOTS.SIMILAR_MOVIES,
              params,
            ),
            apiFunc: fetchSimilarMoviesAPi,
            apiFuncParams: params,
          })(dispatch, getState)

          if (!Array.isArray(res)) return res

          actionPayload = re_FetchPayloadMapper(res)
          break
        }
        default: {
          actionPayload = await fetchSimilarMoviesAPi(params)
        }
      }

      actionPayload && dispatch(fetchSimilarMoviesSuccess(actionPayload))
    } catch (e) {
      const responseError = e as ResponseError
      responseError.error = true
      console.error('Error: similarMoviesAPi', {responseError})
      return responseError
    }
  }

export const fetchPopularMovies =
  (params: FetchPopularMoviesApiParam) =>
  async (dispatch: Dispatch, getState: GetState) => {
    try {
      let actionPayload:
        | Parameters<typeof fetchPopularMoviesSuccess>[0]
        | undefined

      switch (params._actionType) {
        case PAGINATION_ACTION_TYPES.RE_FETCH: {
          const res = await re_fetchPages({
            entityName: 'movies',
            paginationQueryKey: getPaginationQueryKey(
              PAGINATION_QUERY_KEY_ROOTS.POPULAR,
            ),
            apiFunc: fetchPopularMoviesApi,
            apiFuncParams: params,
          })(dispatch, getState)

          if (!Array.isArray(res)) return res

          actionPayload = re_FetchPayloadMapper(res)
          break
        }
        default: {
          actionPayload = await fetchPopularMoviesApi(params)
        }
      }

      actionPayload && dispatch(fetchPopularMoviesSuccess(actionPayload))
    } catch (e) {
      const responseError = e as ResponseError
      responseError.error = true
      console.error('Error: fetchPopularMoviesApi', {responseError})
      return responseError
    }
  }
export const fetchTopRatedMovies =
  (params: FetchTopRatedMoviesApiParam) =>
  async (dispatch: Dispatch, getState: GetState) => {
    try {
      let actionPayload:
        | Parameters<typeof fetchTopRatedMoviesSuccess>[0]
        | undefined

      switch (params._actionType) {
        case PAGINATION_ACTION_TYPES.RE_FETCH: {
          const res = await re_fetchPages({
            entityName: 'movies',
            paginationQueryKey: getPaginationQueryKey(
              PAGINATION_QUERY_KEY_ROOTS.TOP_RATED,
            ),
            apiFunc: fetchTopRatedMoviesApi,
            apiFuncParams: params,
          })(dispatch, getState)

          if (!Array.isArray(res)) return res

          actionPayload = re_FetchPayloadMapper(res)
          break
        }
        default: {
          actionPayload = await fetchTopRatedMoviesApi(params)
        }
      }

      actionPayload && dispatch(fetchTopRatedMoviesSuccess(actionPayload))
    } catch (e) {
      const responseError = e as ResponseError
      responseError.error = true
      console.error('Error: fetchTopRatedMoviesApi', {responseError})
      return responseError
    }
  }

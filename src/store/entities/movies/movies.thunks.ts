import {
  discoverMovieApi,
  fetchMovieApi,
  fetchPopularMoviesApi,
  fetchRecommendationsMoviesApi,
  fetchSimilarMoviesApi,
  fetchTopRatedMoviesApi,
  searchMoviesApi,
} from '../../../api/movies/movies.requests'
import {Dispatch} from '../../store'
import {
  fetchDiscoverMovieSuccess,
  fetchMoviesSuccess,
  fetchPopularMoviesSuccess,
  fetchRecommendationsMoviesSuccess,
  fetchSearchMoviesSuccess,
  fetchSimilarMoviesSuccess,
  fetchTopRatedMoviesSuccess,
} from './movies.slice'
import {
  DiscoverMovieApiParams,
  FetchMovieApiParams,
  FetchPopularMoviesApiParam,
  FetchRecommendationsMoviesApiParams,
  FetchSimilarMoviesApiParams,
  FetchTopRatedMoviesApiParam,
  SearchMoviesApiParams,
} from '../../../api/movies/movies.types'
import {withResponseErrorCatcher} from '../../../utils/errors'

export const fetchMovie = (params: FetchMovieApiParams) =>
  withResponseErrorCatcher(async (dispatch: Dispatch) => {
    const res = await fetchMovieApi(params)

    dispatch(fetchMoviesSuccess(res))
  }, 'fetchMovieApi')

export const discoverMovie = (params: DiscoverMovieApiParams) =>
  withResponseErrorCatcher(async (dispatch: Dispatch) => {
    const actionPayload = await discoverMovieApi(params)

    actionPayload && dispatch(fetchDiscoverMovieSuccess(actionPayload))
    return actionPayload
  }, 'discoverMovieApi')

export const fetchRecommendationsMovies = (
  params: FetchRecommendationsMoviesApiParams,
) =>
  withResponseErrorCatcher(async (dispatch: Dispatch) => {
    const actionPayload = await fetchRecommendationsMoviesApi(params)

    actionPayload && dispatch(fetchRecommendationsMoviesSuccess(actionPayload))
    return actionPayload
  }, 'fetchRecommendationsMoviesApi')

export const fetchSimilarMovies = (params: FetchSimilarMoviesApiParams) =>
  withResponseErrorCatcher(async (dispatch: Dispatch) => {
    const actionPayload = await fetchSimilarMoviesApi(params)

    actionPayload && dispatch(fetchSimilarMoviesSuccess(actionPayload))
    return actionPayload
  }, 'fetchSimilarMoviesAPi')

export const fetchPopularMovies = (params: FetchPopularMoviesApiParam) =>
  withResponseErrorCatcher(async (dispatch: Dispatch) => {
    const actionPayload = await fetchPopularMoviesApi(params)

    actionPayload && dispatch(fetchPopularMoviesSuccess(actionPayload))
    return actionPayload
  }, 'fetchPopularMoviesApi')

export const fetchTopRatedMovies = (params: FetchTopRatedMoviesApiParam) =>
  withResponseErrorCatcher(async (dispatch: Dispatch) => {
    const actionPayload = await fetchTopRatedMoviesApi(params)

    actionPayload && dispatch(fetchTopRatedMoviesSuccess(actionPayload))
    return actionPayload
  }, 'fetchTopRatedMoviesApi')

export const searchMovies = (params: SearchMoviesApiParams) =>
  withResponseErrorCatcher(async (dispatch: Dispatch) => {
    if (!params.query) return
    const actionPayload = await searchMoviesApi(params)

    actionPayload && dispatch(fetchSearchMoviesSuccess(actionPayload))
    return actionPayload
  }, 'searchMoviesApi')

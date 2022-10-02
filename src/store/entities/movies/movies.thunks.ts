import {
  discoverMovieApi,
  fetchMovieApi,
  fetchPopularMoviesApi,
  fetchRecommendationsMoviesAPi,
  fetchSimilarMoviesAPi,
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
  FetchRecommendationsMoviesAPiParams,
  FetchSimilarMoviesAPiParams,
  FetchTopRatedMoviesApiParam,
  SearchMoviesApiParams,
} from '../../../api/movies/movies.types'
import {ResponseError} from '../../../api/api'

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
  (params: DiscoverMovieApiParams) => async (dispatch: Dispatch) => {
    try {
      const actionPayload = await discoverMovieApi(params)

      actionPayload && dispatch(fetchDiscoverMovieSuccess(actionPayload))
      return actionPayload
    } catch (e) {
      const responseError = e as ResponseError
      responseError.error = true
      console.error('Error: discoverMovieApi', {responseError})
      return responseError
    }
  }

export const fetchRecommendationsMovies =
  (params: FetchRecommendationsMoviesAPiParams) =>
  async (dispatch: Dispatch) => {
    try {
      const actionPayload = await fetchRecommendationsMoviesAPi(params)

      actionPayload &&
        dispatch(fetchRecommendationsMoviesSuccess(actionPayload))
      return actionPayload
    } catch (e) {
      const responseError = e as ResponseError
      responseError.error = true
      console.error('Error: fetchRecommendationsMoviesAPi', {responseError})
      return responseError
    }
  }

export const fetchSimilarMovies =
  (params: FetchSimilarMoviesAPiParams) => async (dispatch: Dispatch) => {
    try {
      const actionPayload = await fetchSimilarMoviesAPi(params)

      actionPayload && dispatch(fetchSimilarMoviesSuccess(actionPayload))
      return actionPayload
    } catch (e) {
      const responseError = e as ResponseError
      responseError.error = true
      console.error('Error: fetchSimilarMoviesAPi', {responseError})
      return responseError
    }
  }

export const fetchPopularMovies =
  (params: FetchPopularMoviesApiParam) => async (dispatch: Dispatch) => {
    try {
      const actionPayload = await fetchPopularMoviesApi(params)

      actionPayload && dispatch(fetchPopularMoviesSuccess(actionPayload))
      return actionPayload
    } catch (e) {
      const responseError = e as ResponseError
      responseError.error = true
      console.error('Error: fetchPopularMoviesApi', {responseError})
      return responseError
    }
  }

export const fetchTopRatedMovies =
  (params: FetchTopRatedMoviesApiParam) => async (dispatch: Dispatch) => {
    try {
      const actionPayload = await fetchTopRatedMoviesApi(params)

      actionPayload && dispatch(fetchTopRatedMoviesSuccess(actionPayload))
      return actionPayload
    } catch (e) {
      const responseError = e as ResponseError
      responseError.error = true
      console.error('Error: fetchTopRatedMoviesApi', {responseError})
      return responseError
    }
  }

export const searchMovies =
  (params: SearchMoviesApiParams) => async (dispatch: Dispatch) => {
    try {
      if (!params.query) return
      const actionPayload = await searchMoviesApi(params)

      actionPayload && dispatch(fetchSearchMoviesSuccess(actionPayload))
      return actionPayload
    } catch (e) {
      const responseError = e as ResponseError
      responseError.error = true
      console.error('Error: searchMoviesApi', {responseError})
      return responseError
    }
  }

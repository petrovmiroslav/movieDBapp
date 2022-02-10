import {createEntityAdapter, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Movie, MoviesEntitiesPayload} from './movies.types'
import {PaginationActionPayload} from '../../pagination/pagination.types'
import {ENTITIES_NAMES_PLURAL} from '../../../constants/entities'
import {createEntitiesReducer, createEntityMatcher} from '../../../utils/store'

const ENTITY_SLICE_NAME = ENTITIES_NAMES_PLURAL.movies

export const moviesAdapter = createEntityAdapter<Movie>()

export const moviesSlice = createSlice({
  name: ENTITY_SLICE_NAME,
  initialState: moviesAdapter.getInitialState(),
  reducers: {
    fetchMoviesSuccess(state, action: PayloadAction<MoviesEntitiesPayload>) {
      moviesAdapter.upsertMany(state, action.payload.entities.movies)
    },
    fetchDiscoverMovieSuccess(
      _state,
      _action: PayloadAction<
        MoviesEntitiesPayload & PaginationActionPayload<'movies'>
      >,
    ) {},
    fetchRecommendationsMoviesSuccess(
      _state,
      _action: PayloadAction<
        MoviesEntitiesPayload & PaginationActionPayload<'movies'>
      >,
    ) {},
    fetchSimilarMoviesSuccess(
      _state,
      _action: PayloadAction<
        MoviesEntitiesPayload & PaginationActionPayload<'movies'>
      >,
    ) {},
    fetchPopularMoviesSuccess(
      _state,
      _action: PayloadAction<
        MoviesEntitiesPayload & PaginationActionPayload<'movies'>
      >,
    ) {},
    fetchTopRatedMoviesSuccess(
      _state,
      _action: PayloadAction<
        MoviesEntitiesPayload & PaginationActionPayload<'movies'>
      >,
    ) {},
  },
  extraReducers: builder => {
    builder.addMatcher(
      createEntityMatcher(ENTITY_SLICE_NAME),
      createEntitiesReducer(ENTITY_SLICE_NAME, moviesAdapter),
    )
  },
})

export const {
  fetchMoviesSuccess,
  fetchDiscoverMovieSuccess,
  fetchRecommendationsMoviesSuccess,
  fetchSimilarMoviesSuccess,
  fetchPopularMoviesSuccess,
  fetchTopRatedMoviesSuccess,
} = moviesSlice.actions

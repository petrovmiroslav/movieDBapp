import {createEntityAdapter, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Movie, MoviesEntitiesPayload} from './movies.types'
import {ENTITIES_NAMES_PLURAL} from '../../../constants/entities'
import {createEntitiesReducer, createEntityMatcher} from '../../../utils/store'

const ENTITY_SLICE_NAME = ENTITIES_NAMES_PLURAL.movies

export const moviesAdapter = createEntityAdapter<Movie>()

export const moviesSlice = createSlice({
  name: ENTITY_SLICE_NAME,
  initialState: moviesAdapter.getInitialState(),
  reducers: {
    fetchMoviesSuccess(
      _state,
      _action: PayloadAction<MoviesEntitiesPayload>,
    ) {},
    fetchDiscoverMovieSuccess(
      _state,
      _action: PayloadAction<MoviesEntitiesPayload>,
    ) {},
    fetchRecommendationsMoviesSuccess(
      _state,
      _action: PayloadAction<MoviesEntitiesPayload>,
    ) {},
    fetchSimilarMoviesSuccess(
      _state,
      _action: PayloadAction<MoviesEntitiesPayload>,
    ) {},
    fetchPopularMoviesSuccess(
      _state,
      _action: PayloadAction<MoviesEntitiesPayload>,
    ) {},
    fetchTopRatedMoviesSuccess(
      _state,
      _action: PayloadAction<MoviesEntitiesPayload>,
    ) {},
    fetchSearchMoviesSuccess(
      _state,
      _action: PayloadAction<MoviesEntitiesPayload>,
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
  fetchSearchMoviesSuccess,
} = moviesSlice.actions

import {ENTITIES_NAMES_PLURAL} from '../../../constants/entities'
import {createEntityAdapter, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {PaginationActionPayload} from '../../pagination/pagination.types'
import {Favorite, FavoritesEntitiesPayload} from './favorites.types'
import {createEntitiesReducer, createEntityMatcher} from '../../../utils/store'

const ENTITY_SLICE_NAME = ENTITIES_NAMES_PLURAL.favorites

export const favoritesAdapter = createEntityAdapter<Favorite>()

export const favoritesSlice = createSlice({
  name: ENTITY_SLICE_NAME,
  initialState: favoritesAdapter.getInitialState(),
  reducers: {
    fetchFavoritesSuccess(
      _state,
      _action: PayloadAction<
        FavoritesEntitiesPayload & PaginationActionPayload<'favorites'>
      >,
    ) {},
  },
  extraReducers: builder => {
    builder.addMatcher(
      createEntityMatcher(ENTITY_SLICE_NAME),
      createEntitiesReducer(ENTITY_SLICE_NAME, favoritesAdapter),
    )
  },
})

export const {fetchFavoritesSuccess} = favoritesSlice.actions

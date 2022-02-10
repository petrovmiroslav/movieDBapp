import {createEntityAdapter, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Genre} from './genres.types'
import {EntitiesActionPayload} from '../entities.types'
import {ENTITIES_NAMES_PLURAL} from '../../../constants/entities'
import {createEntitiesReducer, createEntityMatcher} from '../../../utils/store'

const ENTITY_SLICE_NAME = ENTITIES_NAMES_PLURAL.genres

export const genresAdapter = createEntityAdapter<Genre>()

export const genresSlice = createSlice({
  name: ENTITY_SLICE_NAME,
  initialState: genresAdapter.getInitialState(),
  reducers: {
    fetchGenresSuccess(
      _state,
      _action: PayloadAction<EntitiesActionPayload<'genres'>>,
    ) {},
  },
  extraReducers: builder => {
    builder.addMatcher(
      createEntityMatcher(ENTITY_SLICE_NAME),
      createEntitiesReducer(ENTITY_SLICE_NAME, genresAdapter),
    )
  },
})

export const {fetchGenresSuccess} = genresSlice.actions

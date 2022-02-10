import {createEntityAdapter, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Image} from './images.types'
import {EntitiesActionPayload} from '../entities.types'
import {ENTITIES_NAMES_PLURAL} from '../../../constants/entities'
import {createEntitiesReducer, createEntityMatcher} from '../../../utils/store'

const ENTITY_SLICE_NAME = ENTITIES_NAMES_PLURAL.images

export const imagesAdapter = createEntityAdapter<Image>()

export const imagesSlice = createSlice({
  name: ENTITY_SLICE_NAME,
  initialState: imagesAdapter.getInitialState(),
  reducers: {
    fetchImagesSuccess(
      _state,
      _action: PayloadAction<EntitiesActionPayload<'images'>>,
    ) {},
  },
  extraReducers: builder => {
    builder.addMatcher(
      createEntityMatcher(ENTITY_SLICE_NAME),
      createEntitiesReducer(ENTITY_SLICE_NAME, imagesAdapter),
    )
  },
})

export const {fetchImagesSuccess} = imagesSlice.actions

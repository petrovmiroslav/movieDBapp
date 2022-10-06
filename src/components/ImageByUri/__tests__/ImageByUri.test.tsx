import {act, screen} from '@testing-library/react-native'
import React from 'react'
import ImageByUri, {getImageByUriTestId} from '../ImageByUri'
import {EntitiesIds} from '../../../store/entities/entities.types'
import {renderWithStoreProvider} from '../../../utils/tests'

const IMAGE_ID = 'IMAGE_ID' as EntitiesIds['image']
const BASE_URL = '/BASE_URL'
const SIZE_PART = '/SIZE_PART'
const FILE_PATH = '/FILE_PATH'
const SOURCE = BASE_URL + SIZE_PART + FILE_PATH
const TEST_ID = getImageByUriTestId(IMAGE_ID)

test(`'<ImageByUri imageId="${IMAGE_ID}" baseUrl="${BASE_URL}" sizePart="${SIZE_PART}" />' 
              renders Image with source="${SOURCE}"`, () => {
  const {store} = renderWithStoreProvider(
    <ImageByUri imageId={IMAGE_ID} baseUrl={BASE_URL} sizePart={SIZE_PART} />,
  )

  act(() => {
    store.dispatch({
      type: '',
      payload: {entities: {images: [{id: IMAGE_ID, filePath: FILE_PATH}]}},
    })
  })

  expect(screen.getByTestId(TEST_ID).props.source.uri).toBe(SOURCE)
})

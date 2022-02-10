import {shallowEqual, useSelector} from 'react-redux'
import {selectValueOfConfigurationImagesState} from '../selectors/configuration.selectors'
import {IMAGE_TYPES} from '../store/entities/images/images.types'
import {useMemo} from 'react'
import {getOptimalImageWidth} from '../utils/images'

export type UseImageUriParams = {
  imageType: IMAGE_TYPES
  widthOnScreen?: number
}
export const useImageUri = ({imageType, widthOnScreen}: UseImageUriParams) => {
  const secureBaseUrl = useSelector(
    selectValueOfConfigurationImagesState('secureBaseUrl'),
  ) as string | undefined
  const imageSizesList = useSelector(
    selectValueOfConfigurationImagesState(
      imageType === IMAGE_TYPES.POSTERS ? 'posterSizes' : 'backdropSizes',
    ),
    shallowEqual,
  ) as string[] | undefined

  const sizePart = useMemo(
    () => getOptimalImageWidth(imageSizesList, widthOnScreen),
    [imageSizesList, widthOnScreen],
  )

  return {
    baseUrl: secureBaseUrl,
    sizePart,
  }
}

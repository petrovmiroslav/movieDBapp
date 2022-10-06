import React, {useMemo} from 'react'
import {getImageUrl} from '../../utils/images'
import {Image, ImageStyle, StyleProp} from 'react-native'
import {shallowEqual, useSelector} from 'react-redux'
import {selectImageById} from '../../store/entities/images/images.selectors'
import {ImageId} from '../../store/entities/images/images.types'

export const getImageByUriTestId = (imageId: ImageByUriProps['imageId']) =>
  ImageByUri + imageId

export type ImageByUriProps = {
  imageId: ImageId
  baseUrl: string | undefined
  sizePart: string | undefined
  style?: StyleProp<ImageStyle>
}
const ImageByUri = ({imageId, baseUrl, sizePart, style}: ImageByUriProps) => {
  const {filePath} = useSelector(selectImageById(imageId), shallowEqual) ?? {}

  const uri = useMemo(
    () => getImageUrl(baseUrl, sizePart, filePath),
    [baseUrl, filePath, sizePart],
  )

  // console.log('ImageByUri RENDER', {imageId})
  return (
    <Image testID={getImageByUriTestId(imageId)} source={{uri}} style={style} />
  )
}
export default React.memo(ImageByUri)

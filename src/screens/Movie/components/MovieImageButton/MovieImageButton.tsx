import React from 'react'
import ImageByUri, {
  ImageByUriProps,
} from '../../../../components/ImageByUri/ImageByUri'
import {IMAGE_TYPES} from '../../../../store/entities/images/images.types'
import {styleSheetCompose} from '../../../../utils/styles'
import {styles} from './MovieImageButton.styles'
import Button from '../../../../components/buttons/Button/Button'

export type MovieImageButtonProps = {
  imageType: IMAGE_TYPES
} & Pick<ImageByUriProps, 'imageId' | 'baseUrl' | 'sizePart'>
const MovieImageButton = ({
  imageId,
  imageType,
  baseUrl,
  sizePart,
}: MovieImageButtonProps) => {
  return (
    <Button
      style={styleSheetCompose(
        styles.button,
        imageType === IMAGE_TYPES.POSTERS && styles.button_poster,
      )}
      disabled={true}>
      <ImageByUri
        imageId={imageId}
        baseUrl={baseUrl}
        sizePart={sizePart}
        style={styles.image}
      />
    </Button>
  )
}
export default React.memo(MovieImageButton)

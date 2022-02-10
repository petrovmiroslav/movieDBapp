import {WINDOW} from '../constants/styles'
import {DEFAULT_IMAGE_SIZE} from '../store/configuration/configuration.slice'

/** Возвращает первый размер из списка sizesList который больше width*/
export const getOptimalImageWidth = (
  sizesList: string[] | undefined,
  width: number = WINDOW.width,
): string | undefined => {
  if (!sizesList?.length) return

  const pixelSizesList = sizesList.reduce<number[]>((list, curr) => {
    if (!curr.startsWith('w')) return list
    const maybeNumber = +curr.slice(1)
    if (Number.isNaN(maybeNumber)) return list
    list.push(maybeNumber)
    return list
  }, [])

  const sortedPixelSizesList = pixelSizesList.sort((a, b) => a - b)

  for (let i = 0; i < sortedPixelSizesList.length; i++) {
    if (sortedPixelSizesList[i] > width) return 'w' + sortedPixelSizesList[i]
  }
}

export const getImageUrl = (
  baseUrl: string | undefined,
  size: string | undefined,
  filePath: string | undefined | null,
): string | undefined => {
  if (!baseUrl || !filePath) return
  return baseUrl + (size ?? DEFAULT_IMAGE_SIZE) + filePath
}

export type ConfigurationImagesState = {
  baseUrl?: string
  secureBaseUrl?: string
  backdropSizes?: string[]
  posterSizes?: string[]
}

export type ConfigurationState = {
  images?: ConfigurationImagesState
}

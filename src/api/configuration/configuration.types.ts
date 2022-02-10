export type ConfigurationImagesDto = {
  base_url?: string
  secure_base_url?: string
  backdrop_sizes?: string[]
  poster_sizes?: string[]
}

export type ConfigurationDto = {
  images?: ConfigurationImagesDto
}

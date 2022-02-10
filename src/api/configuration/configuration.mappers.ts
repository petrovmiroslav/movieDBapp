import {ConfigurationDto, ConfigurationImagesDto} from './configuration.types'
import {
  ConfigurationImagesState,
  ConfigurationState,
} from '../../store/configuration/configuration.types'

export const configurationImagesDtoMapper = (
  configurationImagesDto: ConfigurationImagesDto | undefined,
): ConfigurationImagesState | undefined =>
  configurationImagesDto && {
    baseUrl: configurationImagesDto.base_url,
    secureBaseUrl: configurationImagesDto.secure_base_url,
    backdropSizes: configurationImagesDto.backdrop_sizes,
    posterSizes: configurationImagesDto.poster_sizes,
  }

export const configurationDtoMapper = (
  configurationDto: ConfigurationDto,
): ConfigurationState => ({
  images: configurationImagesDtoMapper(configurationDto.images),
})

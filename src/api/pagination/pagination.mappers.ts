import {
  Entities,
  EntitiesActionPayload,
  EntitiesIds,
  EntitiesNamesPlural,
  EntitiesNamesSingularByPlural,
  PickEntityIdType,
} from '../../store/entities/entities.types'
import {
  PaginationActionPayload,
  PaginationQueryKey,
  PaginationQueryKeyActionPayloadData,
} from '../../store/pagination/pagination.types'
import {PaginationApiParams, PaginationDto} from './pagination.types'
import {getEntityId, getValidEntitiesIdsList} from '../../utils/store'

export const paginationResponseMapper = (response: PaginationDto) => ({
  page: response.page ?? 1,
  totalPages: response.total_pages,
  totalResults: response.total_results,
})

export const paginationMapper = <Entity extends Entities[keyof Entities]>(
  entitiesList: Entity[],
  responseBody: PaginationDto,
  queryKey: PaginationQueryKey,
  actionType?: PaginationApiParams['_actionType'],
): PaginationQueryKeyActionPayloadData<PickEntityIdType<Entity>> => ({
  _actionType: actionType,
  queryKey: queryKey,
  pages: [
    {
      ids: getValidEntitiesIdsList(
        entitiesList?.map(entity => getEntityId(entity)),
      ),
      ...paginationResponseMapper(responseBody),
    },
  ],
})

export const re_FetchPayloadMapper = <
  EntityNameForEntities extends keyof EntitiesNamesPlural,
  EntityNameForPagination extends keyof EntitiesNamesPlural,
>(
  response: (EntitiesActionPayload<EntityNameForEntities> &
    PaginationActionPayload<EntityNameForPagination>)[],
) =>
  response.reduce(
    (payload, currResponse) => {
      const entitiesNames = Object.keys(
        currResponse.entities,
      ) as EntityNameForEntities[]

      entitiesNames.forEach(entityName => {
        payload.entities[entityName] = payload.entities[entityName] ?? []
        currResponse.entities[entityName].forEach(entity =>
          payload.entities[entityName].push(entity),
        )
      })

      const responsePaginationNames = Object.keys(
        currResponse.pagination,
      ) as EntityNameForPagination[]

      responsePaginationNames.forEach(paginationName => {
        const paginationNamePayloadsByQueryQey: {
          [key in PaginationQueryKey]?: PaginationQueryKeyActionPayloadData<
            EntitiesIds[EntitiesNamesSingularByPlural[EntityNameForPagination]]
          >[]
        } = {}

        currResponse.pagination[paginationName].forEach(currPaginationData => {
          paginationNamePayloadsByQueryQey[currPaginationData.queryKey] =
            paginationNamePayloadsByQueryQey[currPaginationData.queryKey] ?? []
          paginationNamePayloadsByQueryQey[currPaginationData.queryKey]!.push(
            currPaginationData,
          )
        })

        payload.pagination[paginationName] =
          payload.pagination[paginationName] ?? []

        const queryKeysList = Object.keys(
          paginationNamePayloadsByQueryQey,
        ) as PaginationQueryKey[]

        queryKeysList.forEach((queryKey, index) => {
          paginationNamePayloadsByQueryQey[queryKey]?.forEach(
            currPaginationData => {
              payload.pagination[paginationName][index] =
                payload.pagination[paginationName][index] ?? {}
              payload.pagination[paginationName][index].queryKey =
                currPaginationData.queryKey
              payload.pagination[paginationName][index]._actionType =
                currPaginationData._actionType

              payload.pagination[paginationName][index].pages =
                payload.pagination[paginationName][index].pages ?? []

              payload.pagination[paginationName][index].pages.push(
                ...currPaginationData.pages,
              )
            },
          )
        })
      })

      return payload
    },
    {
      entities: {},
      pagination: {},
    } as EntitiesActionPayload<EntityNameForEntities> &
      PaginationActionPayload<EntityNameForPagination>,
  )

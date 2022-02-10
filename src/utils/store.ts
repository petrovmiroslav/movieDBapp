import {
  AnyAction,
  EntityId,
  EntityState,
  nanoid,
  PayloadAction,
} from '@reduxjs/toolkit'
import {
  Entities,
  EntitiesActionPayload,
  EntitiesNamesPlural,
  EntitiesNamesSingularByPlural,
  PickEntityIdType,
} from '../store/entities/entities.types'
import {EntityAdapter} from '@reduxjs/toolkit/src/entities/models'
import {RANDOM_ENTITY_ID_SIZE} from '../constants/entities'

export const getRandomId = (size: number = RANDOM_ENTITY_ID_SIZE) =>
  nanoid(size)

//извлекает EntityId
export const getEntityId = <Entity extends Entities[keyof Entities]>(
  entity: Entity,
): PickEntityIdType<Entity> => entity.id

export const checkIsEntityId = (maybeId: any): maybeId is EntityId =>
  typeof maybeId === 'string' || !isNaN(maybeId)

export const getEntitiesListWithValidId = <
  Entity extends Entities[keyof Entities],
>(
  entitiesList: Entity[],
): Entity[] => entitiesList.filter(entity => checkIsEntityId(entity.id))

export const getValidEntitiesIdsList = <EntityIdType extends EntityId>(
  maybeIdsList: (EntityIdType | undefined | null)[],
) => maybeIdsList.filter(checkIsEntityId) as EntityIdType[]

export const createEntityMatcher =
  <EntityName extends keyof EntitiesNamesPlural>(entityName: EntityName) =>
  (
    action: AnyAction,
  ): action is PayloadAction<EntitiesActionPayload<EntityName>> =>
    !!action.payload?.entities?.[entityName]?.length

export const createEntitiesReducer =
  <EntityName extends keyof EntitiesNamesPlural>(
    entityName: EntityName,
    entityAdapter: EntityAdapter<
      Entities[EntitiesNamesSingularByPlural[EntityName]]
    >,
  ) =>
  (
    state: EntityState<Entities[EntitiesNamesSingularByPlural[EntityName]]>,
    action: PayloadAction<EntitiesActionPayload<EntityName>>,
  ) => {
    const newEntitiesList = getEntitiesListWithValidId(
      action.payload.entities[entityName],
    )

    for (let i = 0; i < newEntitiesList.length; i++) {
      const newEntity = newEntitiesList[i]
      const oldEntity = state.entities[newEntity.id]
      if (!oldEntity) continue

      for (const newEntityKey in newEntity) {
        if (newEntity[newEntityKey] === undefined)
          delete newEntity[newEntityKey]
      }
    }

    entityAdapter.upsertMany(state, newEntitiesList)
  }

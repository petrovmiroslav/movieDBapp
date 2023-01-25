import {State} from '../store/store'
import {createSelector, EntitySelectors} from '@reduxjs/toolkit'
import {Entities} from '../store/entities/entities.types'
import {Primitive} from './types'

/**
 * returns a string consist of string values of all passed arguments
 */
export const getValidSelectorCacheKey = (...args: any[]): string => {
  let validCacheKey = ''
  for (let i = 0; i < args.length; i++) {
    validCacheKey += typeof args[i] === 'string' ? args[i] : String(args[i])
  }
  return validCacheKey
}

/**
 * returns a function to ignore unused params
 */
export const createEntityByIdSelector = <
  Entity extends Entities[keyof Entities],
>(
  selector: EntitySelectors<Entity, State>['selectById'],
) => {
  return (state: State, entityId: Entity['id'] | undefined) => {
    if (entityId === undefined) return
    return selector(state, entityId)
  }
}

/**
 * returns a function to use a passed selector in useSelector
 */
export const createSelectEntityByIdFunc = <
  Entity extends Entities[keyof Entities],
>(
  selector: (
    state: State,
    entityId: Entity['id'] | undefined,
  ) => undefined | Entity,
) => {
  return (entityId: Entity['id'] | undefined) => (state: State) =>
    selector(state, entityId)
}

/**
 * crates a reselect to ignore unused params
 */
export const createAllEntitiesListSelector = <
  Entity extends Entities[keyof Entities],
>(
  allEntitiesListSelector: EntitySelectors<Entity, State>['selectAll'],
) => {
  const selector = createSelector(
    [allEntitiesListSelector],
    allEntitiesList => {
      if (!allEntitiesList.length) return
      return allEntitiesList
    },
  )

  return (state: State) => selector(state)
}

/**
 * crates a reselect to ignore unused params
 */
export const createAllEntitiesSelector = <
  Entity extends Entities[keyof Entities],
>(
  allEntitiesSelector: EntitySelectors<Entity, State>['selectEntities'],
) => {
  const selector = createSelector(
    [allEntitiesSelector],
    allEntities => allEntities,
  )

  return (state: State) => selector(state)
}

export const createEntityReSelectors = <
  Entity extends Entities[keyof Entities],
>(
  selectors: EntitySelectors<Entity, State>,
) => {
  const byIdSelector = createEntityByIdSelector(selectors.selectById)
  const selectById = createSelectEntityByIdFunc(byIdSelector)
  const allListSelector = createAllEntitiesListSelector(selectors.selectAll)
  const allEntitiesSelector = createAllEntitiesSelector(
    selectors.selectEntities,
  )

  return {
    byIdSelector,
    selectById,
    allListSelector,
    allEntitiesSelector,
  }
}

export const defaultCachedSelectorKeySelector = (
  _S: State,
  ...args: Primitive[]
) => getValidSelectorCacheKey(...args)

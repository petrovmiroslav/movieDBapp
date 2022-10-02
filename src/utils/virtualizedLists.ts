import {FlatListProps} from 'react-native'

export const keyExtractorForId = <ItemT>(
  id: Parameters<NonNullable<FlatListProps<ItemT>['keyExtractor']>>[0],
): ReturnType<NonNullable<FlatListProps<ItemT>['keyExtractor']>> => String(id)

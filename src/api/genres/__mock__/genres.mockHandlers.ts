import {rest} from 'msw'
import {BASE_URL, PATH_GETTERS} from '../../../constants/api'
import {FetchGenresApiDto} from '../genres.types'

export const fetchGenresApiMockDtoTest: FetchGenresApiDto = {
  genres: [
    {id: 1, name: 'name1'},
    {id: 2, name: 'name2'},
  ],
}

export const fetchGenresApiHandler = rest.get(
  BASE_URL + PATH_GETTERS.fetchGenresApiPath,
  (req, res, ctx) => {
    return res(ctx.json(fetchGenresApiMockDtoTest))
  },
)

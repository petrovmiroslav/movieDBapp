import {fetchGenresApi} from '../genres.requests'
import {server} from '../../../../__mocks__/msw/server'
import {fetchGenresApiMockDtoTest} from '../__mock__/genres.mockHandlers'
import {FetchGenresApiResponse} from '../genres.types'
import {EntitiesIds} from '../../../store/entities/entities.types'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('api/genres/genres.requests.ts', () => {
  let RESPONSE: FetchGenresApiResponse = {
    entities: {
      genres: [
        {id: 1 as EntitiesIds['genre'], name: 'name1'},
        {id: 2 as EntitiesIds['genre'], name: 'name2'},
      ],
    },
  }
  test(`fetchGenresApi() returns ${JSON.stringify(RESPONSE)},
  if response_dto is ${JSON.stringify(
    fetchGenresApiMockDtoTest,
  )},`, async () => {
    expect(await fetchGenresApi()).toEqual(RESPONSE)
  })
})

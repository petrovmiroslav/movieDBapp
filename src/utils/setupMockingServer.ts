import {ENV} from '../constants/env'
import {
  b as RequestHandler,
  c as DefaultBodyType,
  I as SetupServerApi,
  i as RequestHandlerDefaultInfo,
  M as MockedRequest,
} from 'msw/lib/glossary-dc3fd077'

export type SetupMockingServerParam = {
  enabled: boolean
  handlers?: RequestHandler<
    RequestHandlerDefaultInfo,
    MockedRequest<DefaultBodyType>,
    any,
    MockedRequest<DefaultBodyType>
  >[]
}
export const setupMockingServer = ({
  enabled,
  handlers,
}: SetupMockingServerParam): SetupServerApi | undefined => {
  if (!__DEV__ || ENV.IS_TEST_RUNNING || !enabled || !handlers?.length) return

  require('react-native-url-polyfill/auto')
  const {setupServer} = require('msw/native')
  const server = setupServer(...handlers)

  server.listen({onUnhandledRequest: 'bypass'})
  console.log(
    '%cMOCKING REST API! MOCKING REST API! MOCKING REST API! MOCKING REST API!',
    `display: inline-block;
     padding: 10px; 
     background: red;
     color: black`,
  )
  server.printHandlers()
  console.log(
    '%c                                                                         ',
    `display: inline-block;
     padding: 5px; 
     background: red;
     color: black`,
  )

  return server
}

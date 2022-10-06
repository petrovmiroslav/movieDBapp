import Config from 'react-native-config'
export const ENV = {
  V4_API_KEY: Config.V4_API_KEY,
  MOCK_ENABLE: Config.MOCK_ENABLE === 'true',
  IS_TEST_RUNNING: Boolean(process.env.JEST_WORKER_ID),
}

__DEV__ && !ENV.IS_TEST_RUNNING && console.log({ENV})

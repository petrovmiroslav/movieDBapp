const fs = require('fs')
const {execSync} = require('child_process')

async function globalSetup() {
  downloadTestButlerAPKIfNeeded()
}

function downloadTestButlerAPKIfNeeded() {
  if (isAndroidConfig()) {
    downloadTestButlerAPK()
  }
}

function downloadTestButlerAPK() {
  const version = '2.2.1'
  const artifactUrl = `https://repo1.maven.org/maven2/com/linkedin/testbutler/test-butler-app/${version}/test-butler-app-${version}.apk`
  const filePath = `./cache/test-butler-app.apk`

  fs.mkdir('./cache', () => {
    if (!fs.existsSync(filePath)) {
      console.log(`\nDownloading Test-Butler APK v${version}...`)
      execSync(`curl -f -o ${filePath} ${artifactUrl}`)
    }
  })
}

// TODO eventually, this should be made available by Detox more explicitly
function isAndroidConfig() {
  return [
    // config.type,
    process.env.DETOX_CONFIGURATION,
    // config.device
  ].some(s => `${s}`.includes('android'))
}

module.exports = globalSetup

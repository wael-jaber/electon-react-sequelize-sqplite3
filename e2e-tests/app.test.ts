import { ElectronApplication, _electron as electron } from 'playwright'
import { expect, test } from '@playwright/test'
import {
  clickMenuItemById,
  findLatestBuild,
  ipcMainCallFirstListener,
  ipcRendererCallFirstListener,
  parseElectronApp,
} from 'electron-playwright-helpers'

let electronApp: ElectronApplication

test.beforeAll(async () => {
  // find the latest build in the out directory
  const latestBuild = findLatestBuild()
  // parse the directory and find paths and other info
  const appInfo = parseElectronApp(latestBuild)
  // set the CI environment variable to true
  process.env.CI = 'e2e'
  electronApp = await electron.launch({
    args: [appInfo.main],
    executablePath: appInfo.executable
  })
  electronApp.on('window', async (page) => {
    const filename = page.url()?.split('/').pop()
    console.log(`Window opened: ${filename}`)

    // capture errors
    page.on('pageerror', (error) => {
      console.error(error)
    })
    // capture console messages
    page.on('console', (msg) => {
      console.log(msg.text())
    })
  })
})

test('launch app', async () => {
  // close app
  await electronApp.close()
})
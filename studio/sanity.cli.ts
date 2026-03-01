import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '3i77cmnf',
    dataset: 'production'
  },
  deployment: {
    appId: 'iljz5ln7el2wtr5cpcyzpabk',
    autoUpdates: true,
  }
})

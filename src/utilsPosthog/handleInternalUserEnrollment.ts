import { runWhenAvailable } from '../utils'

const KEY = 'is-internal'

export function handleInternalUserEnrollment() {
  const params = new URLSearchParams(window.location.search)
  const isInternal = params.get(KEY)
  if (isInternal === 'true') {
    setIsInternal()
  } else if (isInternal === 'false') {
    setNotInternal()
  }
}

function setIsInternal() {
  runWhenAvailable({
    getMethod: () => window.posthog?.capture,
    callback: () => {
      console.debug(`Setting ${KEY} to true`)
      window.posthog?.setPersonPropertiesForFlags({ [KEY]: true })
      window.posthog?.reloadFeatureFlags()
    },
  })
}

function setNotInternal() {
  runWhenAvailable({
    getMethod: () => window.posthog?.capture,
    callback: () => {
      console.debug(`Setting ${KEY} to false`)
      window.posthog?.setPersonPropertiesForFlags({ [KEY]: false })
      window.posthog?.reloadFeatureFlags()
    },
  })
}

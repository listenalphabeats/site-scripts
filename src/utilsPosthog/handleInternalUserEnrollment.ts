import { runWhenAvailable } from '../utils/runWhenAvailable'

const KEY = 'is_internal'

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
      window.posthog?.capture('$set', { $set: { [KEY]: true } })
    },
  })
}

function setNotInternal() {
  runWhenAvailable({
    getMethod: () => window.posthog?.capture,
    callback: () => {
      window.posthog?.capture('event_name', { $unset: [KEY] })
    },
  })
}

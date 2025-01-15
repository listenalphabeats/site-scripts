export function handleInternalUserEnrollment() {
  const params = new URLSearchParams(window.location.search)
  const isInternal = params.get('is_internal')
  if (isInternal === 'true') {
    console.debug('set isInternal ON')
    window.posthog?.capture('$set', { $set: { is_internal: true } })
  } else if (isInternal === 'false') {
    console.debug('set isInternal OFF')
    // window.posthog?.capture?.('$set', { $set: { is_internal: false } })
    window.posthog?.capture('event_name', { $unset: ['is_internal'] })
  }
}

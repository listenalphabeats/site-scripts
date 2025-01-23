# PostHog utils

Using PostHog to control access to features for internal users.
Example how to check if a feature is enabled:

```ts
window.posthog?.onFeatureFlags(function () {
  if (window.posthog?.isFeatureEnabled('internal-features')) {
    console.debug('internal-features enabled')
  } else {
    console.debug('internal-features DISABLED')
  }
})
```

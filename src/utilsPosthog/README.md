# PostHog utils

Using PostHog to control access to features for internal users.
Example how to check if a feature is enabled:

```ts
window.posthog?.onFeatureFlags(function () {
  if (window.posthog?.isFeatureEnabled('internal-feature')) {
    console.debug('internal-feature enabled')
  } else {
    console.debug('internal-feature DISABLED')
  }
})
```

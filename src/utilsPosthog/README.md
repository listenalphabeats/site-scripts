# PostHog utils

Using PostHog to control access to features for internal users.
Example how to check if a feature is enabled:

```html
<script>
  window?.onPosthogFFAvailable(
    // Flag name defined in PostHog
    'internal-features',
    // Callback to run when the feature is enabled
    () => {
      console.debug('internal-features enabled')
      // Do something like reveal an HTML element, etc.
    },
    // Callback to run when the feature is disabled (optional)
    () => {
      console.debug('internal-features DISABLED')
      // Do something like hide an HTML element, etc.
    }
  )
</script>
```

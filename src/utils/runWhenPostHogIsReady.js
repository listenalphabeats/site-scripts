export function runWhenPostHogIsReady({
  getFeatureFlag,
  callback,
  fallback,
  timeout = 2000,
}) {
  const start = Date.now();
  const checkPostHog = setInterval(() => {
    if (getFeatureFlag() !== undefined) {
      clearInterval(checkPostHog);
      callback();
    } else if (Date.now() - start >= timeout) {
      clearInterval(checkPostHog);
      fallback();
    }
  }, 500); // Check every 500ms if PostHog is available
}

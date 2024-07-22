function runWhenPostHogIsReady({
  getFeatureFlag,
  callback,
  fallback,
  timeout = 2e3
}) {
  const start = Date.now();
  const checkPostHog = setInterval(() => {
    if (getFeatureFlag() !== void 0) {
      clearInterval(checkPostHog);
      callback();
    } else if (Date.now() - start >= timeout) {
      clearInterval(checkPostHog);
      fallback();
    }
  }, 500);
}
